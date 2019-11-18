import React from 'react';
import {StyleSheet, Platform, TextInput,  Form, Text, View, StatusBar, FlatList, TouchableOpacity,   Button, Dimensions} from 'react-native';
 
var width = Dimensions.get('window').width; //full width


class SignUpUser extends React.Component { 
  
  constructor(props){
    super(props);

    this.state = {
      name: '',
      email: '',
      idnumber: '', 
      password: '',
      c_password: '', 
    }

    this.handleSubmit = this.handleSubmit.bind(this);
 
  }

  handleSubmit(e){
    e.preventDefault();
    console.log(this.state);

    let apiPostUser = 'http://fstedie.fatcow.com/public_html/index.php/api/register';

    fetch(apiPostUser, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        name: this.state.name, 
        email: this.state.email, 
        idnumber: this.state.idnumber,
        password: this.state.password, 
        c_password: this.state.c_password
      }), 
    })
    .then(function (data) {  
      alert('Success');
      this.clearStates();
    })  
    .catch(function (error) {  
      console.log('Request failure: ', error);  
    }); 
    
    clearStates = () => {
        this.setState({
          name: '',
          email: '',
          password: '',
          idnumber: '',
          c_password: '',
        })
      }
  
  }

   
  
  render(){
    return (
      <View style = {styles.container} >   
 
          <TextInput style={styles.inputBox}  
              placeholder="Name"
              name = "name"
              placeholderTextColor = "gray"
              selectionColor="gray"
              keyboardType="default"
              onChangeText = {(name) => this.setState({name}) }
              value = {this.state.name}
              />

          <TextInput style={styles.inputBox}  
              placeholder="Email"
              name = "email"
              placeholderTextColor = "gray"
              selectionColor="gray" 
              keyboardType="email-address"
              onChangeText = {(email) => this.setState({email})}
              value = {this.state.email}
              />

           <TextInput style={styles.inputBox}  
              placeholder="Id Number"
              name = "idnumber"
              placeholderTextColor = "gray"
              selectionColor="gray" 
              keyboardType= {"numeric"}
              onChangeText = {(idnumber) => this.setState({idnumber})}
              value = {this.state.idnumber}
              />

          <TextInput style={styles.inputBox}  
              placeholder="Password"
              name = "password"
              placeholderTextColor = "gray"
              selectionColor="gray" 
              secureTextEntry={true}
              onChangeText = {(password) => this.setState({password})}
              value = {this.state.password}
              />

          <TextInput style={styles.inputBox}  
              placeholder="Confirm Password"
              placeholderTextColor = "gray"
              selectionColor="gray" 
              name = "c_password"
              secureTextEntry={true}
              onChangeText = {(c_password) => this.setState({c_password})}
              value = {this.state.c_password}
              />

            <TouchableOpacity style={styles.button} onPress = {this.handleSubmit}>
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
    borderRadius: 25,
    padding:10,
    paddingLeft: 20, 
    fontSize:16,
    color:'white',
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
    backgroundColor:'#fff',
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

export default SignUpUser;