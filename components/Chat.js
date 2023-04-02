import { StyleSheet, View, Text, Button, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { collection, query, orderBy, onSnapshot, addDoc } from 'firebase/firestore';

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

export default function Chat({ navigation, route, db }) {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        let name = route.params.name;
        let color = route.params.color;
        navigation.setOptions({ title: name })
        navigation.setOptions({
            headerStyle: {
                backgroundColor: color,
            },
        });

        //define query reference
        const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
        //code to execute when component mounted or updated
        const unsubscribeMessages = onSnapshot(q, (querySnapshot) => {
            let newMessages = [];
            querySnapshot.forEach(doc => {
                const newMessage = doc.data();
                newMessage.createdAt = new Date(
                    newMessage.createdAt.seconds * 1000
                );
                newMessages.push(newMessage);
            });
            setMessages(newMessages);
        });

        //clean up code
        return () => {
            //code to execute when the component will be unmounted
            if (unsubscribeMessages) unsubscribeMessages();
        }
    }, [navigation, route.params.name, route.params.color, db]);

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
                onSend={messages => onSend(messages)}
                user = {{
                    _id: 'state.user._id',
                    name: route.params.name
                }}
            />
            {Platform.OS === 'android' ? <KeyboardAvoidingView behavior='height' /> : null}
            {Platform.OS === 'ios' ? <KeyboardAvoidingView behavior='padding' /> : null}
        </View>
        );
    }


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

