import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Button,
  Platform
} from "react-native";
import firebase from '../../Firebase'; 
 

//import Spinner from 'react-native-loading-spinner-overlay';

var width = Dimensions.get("window").width; //full width

class LoginComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "", 
      errorMessage: null,
    };

    
  }
 
  handleLogin = () => {
  
    const { email, password } = this.state 
      firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => this.props.navigation.navigate('PollScreen'))
            .catch(error => this.setState({errorMessage: error.message}))
  }
  
  render() {
    return (
      <View style={styles.container}>
        {/* <Spinner
                  visible={this.state.spinner}
                  textContent={'Loading...'}
                  
                /> */}

        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Email"
          placeholderTextColor="gray"
          name="email"
          keyboardType="email-address"
          onSubmitEditing={() => this.password.focus()}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="gray"
          name="password"
          ref={input => (this.password = input)}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
          <Text style={styles.buttonText}>{this.props.type}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  inputBox: {
    backgroundColor: "#E3F4FE",
    width: width - 30,
    borderBottomColor: "gray",
    borderBottomWidth: 0,
    borderRadius: 10,

    paddingLeft: 20,
    fontSize: 16,
    color: "black",

    marginVertical: 10,
    ...Platform.select({
      ios: {
        padding: 15
      },
      android: {
        padding: 10
      }
    })
  },

  button: {
    width: 300,
    backgroundColor: "#1D71F2",
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ffffff",
    textAlign: "center"
  }
});

export default LoginComponent;
