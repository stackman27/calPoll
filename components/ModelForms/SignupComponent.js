import React from 'react';
import {StyleSheet, Platform, TextInput,  Form, Text, View, StatusBar, FlatList, TouchableOpacity,   Button, Dimensions} from 'react-native';
import firebase from '../../Firebase'; 
 
var width = Dimensions.get('window').width; //full width


class SignupComponent extends React.Component { 
  
  constructor(props){
    super(props);
    this.ref = firebase.firestore().collection('users');
      
    this.state = { 
      email: '',  
      password: '', 
    }
 
  }

  handleSignup = () => {
    firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => this.props.navigation.navigate('PollScreen'))
            .catch(error => this.setState({  }) )
  }

   
  
  render(){
    return (
      <View style = {styles.container} >   
 
{/*           <TextInput style={styles.inputBox}  
              placeholder="Name"
              name = "name"
              placeholderTextColor = "gray"
              keyboardType="default"
              onChangeText = {(name) => this.setState({name}) }
              value = {this.state.name}
              /> */}

          <TextInput style={styles.inputBox}  
              placeholder="Email"
              name = "email"
              placeholderTextColor = "gray"
              keyboardType="email-address"
              onChangeText = {(email) => this.setState({email})}
              value = {this.state.email}
              />

          <TextInput style={styles.inputBox}  
              placeholder="Password"
              name = "password"
              placeholderTextColor = "gray"
              secureTextEntry={true}
              onChangeText = {(password) => this.setState({password})}
              value = {this.state.password}
              />

{/*           <TextInput style={styles.inputBox}  
              placeholder="Confirm Password"
              placeholderTextColor = "gray"
              name = "c_password"
              secureTextEntry={true}
              onChangeText = {(c_password) => this.setState({c_password})}
              value = {this.state.c_password}
          /> */}

            <TouchableOpacity style={styles.button} onPress = {this.handleSignup}>
             <Text style={styles.buttonText}>Sign Up</Text>
           </TouchableOpacity>     
          
      </View>
    );
  }
}

const styles = StyleSheet.create({
 
  container : {
    flexGrow: 1,
    justifyContent:'center',
    alignItems: 'center'
  },


  inputBox: {
    width: width - 30,
    backgroundColor:'#E3F4FE',
    borderRadius: 10,
    padding:10,
    paddingLeft: 20, 
    fontSize:16,
    color:'black',
    marginVertical: 10,
    ...Platform.select({
      ios: {
        padding:15,
      },
      android: {
        padding:10,
      },
    }),

  },

  
  button: {
    width:300,
    backgroundColor:'#1D71F2',
     borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 13
      
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  }

});

export default SignupComponent;