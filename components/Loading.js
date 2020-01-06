import React, { Component } from 'react'
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native'
import firebase from '../Firebase';

class Loading extends Component {

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'PollScreen' : 'Signupscreen')
        })
    }

    render() {
        return (
            <View style = {styles.container}>
                <Text> Loading </Text>
                <ActivityIndicator size = "large" />
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


export default Loading