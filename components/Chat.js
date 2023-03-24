import { StyleSheet, View, Text, Button } from 'react-native';
import React from 'react';

export default class Chat extends React.Component {
    componentDidMount() {
        let name=this.props.route.params.name;
        this.props.navigation.setOptions({ title: name });
    }

    render() {
        let color=this.props.route.params.color;
        return (
            <View style={[styles.container, { backgroundColor: color }]}>
                <Text>This is the chat screen.</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

