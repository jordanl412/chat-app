import { StyleSheet, View, Text, Button, TextInput, ImageBackground, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';
import { getAuth, signInAnonymously } from 'firebase/auth';

const backgroundColors = {
    black: { backgroundColor: '#000000' },
    grey: { backgroundColor: '#8a95a5' },
    purple: { backgroundColor: '#474056' },
    green: { backgroundColor: '#94ae89' }
}

const Start = ({ navigation }) => {
    const { black, grey, purple, green } = backgroundColors;
    const [name, setName] = useState('');
    const [color, setColor] = useState('');

    //initialize Firebase authentication handler
    const auth = getAuth();

    //sign-in logic
    const signInUser = () => {
        signInAnonymously(auth)
            .then(result => {
                navigation.navigate('Chat', {
                    name: name,
                    color: color,
                    userID: result.user.uid 
                });
                Alert.alert('Signed in successfully!');
            })
            .catch((error) => {
                Alert.alert('Unable to sign in, try again later.');
            })
    }

    return (
        <KeyboardAvoidingView style = {{ flex: 1 }}>
            <ImageBackground
                source={require('../assets/Background-Image.png')}
                style={[styles.container, styles.image]}
            >
                <Text style={styles.title}>Chat App</Text>
                    <View style={styles.inputBox}>
                        <TextInput
                            style={styles.nameBox}
                            value={name}
                            onChangeText={(name) => setName(name)}
                            placeholder='Type your username here'
                        />
                        <View>
                            <Text style={styles.colorSelector}>Choose your Background:</Text>
                            <View style={styles.colorWrapper}>
                                <TouchableOpacity style={[styles.color, black]}
                                    onPress={() =>
                                    setColor(black.backgroundColor)
                                } />
                                <TouchableOpacity style={[styles.color, grey]}
                                    onPress={() => 
                                    setColor(grey.backgroundColor)
                                } />
                                <TouchableOpacity style={[styles.color, purple]}
                                    onPress={() => 
                                    setColor(purple.backgroundColor)
                                } />
                                <TouchableOpacity style={[styles.color, green]}
                                    onPress={() => 
                                    setColor(green.backgroundColor)
                                } />
                            </View>
                        </View>
                        <TouchableOpacity  
                            style={[styles.nameBox, styles.chatBox]}
                            onPress={signInUser}
                            >
                                <Text style={[styles.colorSelector, styles.chatBoxText]}>
                                    Start Chatting
                                </Text>
                            </TouchableOpacity>
                    </View>
                    {Platform.OS === 'android' ? <KeyboardAvoidingView behavior='height' /> : null}
                    {Platform.OS === 'ios' ? <KeyboardAvoidingView behavior='padding' /> : null}
            </ImageBackground>
        </KeyboardAvoidingView>
    )
}
    

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    image: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    title: {
        color: '#ffffff',
        fontSize: 50,
        fontWeight: '600',
        marginTop: 60
    },

    inputBox: {
        backgroundColor: '#ffffff',
        marginBottom: 15,
        height: '44%',
        width: '88%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20
    },

    nameBox: {
        height: 50,
        width: '88%',
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 2,
        color: '#757083',
        opacity: 50,
        fontSize: 16,
        fontWeight: '300',
        paddingLeft: 10
    },

    colorSelector: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        opacity: 100
    },

    colorWrapper: {
        flexDirection: 'row'
    },

    color: {
        width: 40,
        height: 40,
        borderRadius: 20,
        margin: 10
    },

    chatBox: {
        backgroundColor: '#757083',
        justifyContent: 'center'
    },

    chatBoxText: {
        color: '#ffffff',
        fontWeight: '300'
    }
});
   
export default Start;