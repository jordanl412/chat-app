import { StyleSheet, View, Text, Button, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import { collection, query, orderBy, onSnapshot, addDoc, where } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage'

const renderBubble = (props) => {
    return (
        <Bubble
            {...props}
            wrapperStyle={{
                right: {
                    backgroundColor: '#000',
                },
                left: {
                    backgroundColor: '#FFF',
                },
            }}
        />
    );
};

const renderInputToolbar = (props, isConnected) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
};

export default function Chat({ navigation, route, db, isConnected }) {

    const [messages, setMessages] = useState([]);

    let unsubscribeMessages;

    useEffect(() => {
        if (isConnected === true) {
            //Retrieve name and color values from navigation prop
            let name = route.params.name;
            let color = route.params.color;

            //Set header title and background to name and color values
            navigation.setOptions({ title: name })
            navigation.setOptions({
                headerStyle: {
                    backgroundColor: color,
                },
            });

            //unregister current onSnapshot() listener to avoid registering multiple listeners when useEffect code is re-executed
            if (unsubscribeMessages) unsubscribeMessages();
            unsubscribeMessages = null;
            //define query reference
            const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
            //code to execute when component mounted or updated
            unsubscribeMessages = onSnapshot(q, (querySnapshot) => {
                let newMessages = [];
                querySnapshot.forEach(doc => {
                    const newMessage = doc.data();
                    newMessage.createdAt = new Date(
                        newMessage.createdAt.seconds * 1000
                    );
                    newMessages.push(newMessage);
                });
                cacheMessages(newMessages);
                setMessages(newMessages);
            });
        } else loadCachedMessages();
    
        //clean up code
        return () => {
            //code to execute when the component will be unmounted
            if (unsubscribeMessages) unsubscribeMessages();
        }
    }, [isConnected]);

    const loadCachedMessages = async () => {
        const cachedMessages = await AsyncStorage.getItem('chat messages') || [];
        setMessages(JSON.parse(cachedMessages));
    }

    const cacheMessages = async (messagesToCache) => {
        try {
            await AsyncStorage.setItem('chat messages', JSON.stringify(messagesToCache));
        } catch (error) {
            console.log(error.message);
        }
    }

    //adds new message to 'messages' collection in Firestore when user sends a new message
    const onSend = (newMessages) => {
        addDoc(collection(db, 'messages'), {
            ...newMessages[0],
            createdAt: new Date(),
            user: {
                _id: route.params.userID,
                name: route.params.name
            },
        });
    };

    return (
        <View style={[styles.container, { backgroundColor: route.params.color }]}>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                renderInputToolbar={(props) => renderInputToolbar(props, isConnected)}
                onSend={messages => onSend(messages)}
                user = {{
                    _id: 'state.user._id',
                    name: route.params.name
                }}
            />
            {Platform.OS === 'android' ? <KeyboardAvoidingView behavior='height' /> : null}
            {Platform.OS === 'ios' ? <KeyboardAvoidingView behavior='padding height' /> : null}
        </View>
        );
    }


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

