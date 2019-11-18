import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, StatusBar, Dimensions} from 'react-native';
 
import Logo from './Logo';
import LoginUser from './ModelForms/LoginUser';

var {width } = Dimensions.get('window');

class Login extends React.Component { 
  
 

    _gotoSignup = () => {
         this.props.navigation.navigate('Signupscreen'); 
     
    }

 
  render(){
    return (
      <View style = {styles.container}>
        <View style = {{backgroundColor: '#FDC741', flex: 2}}>  
            <Logo /> 

            <View style = {styles.fidgetSpinner}>  
            </View> 
        </View>

            <View style = {{backgroundColor: '#eee', flex: 5}}>  
                <LoginUser type="Login" pressChange = {this.props.navigation}/>  
                
                <View style = {styles.signupTextCont}> 
                    <Text style = {styles.signupText}> Don't have an account yet?</Text>
                        <TouchableOpacity onPress = {this._gotoSignup}> 
                            <Text style = {styles.signupButton}> SignUp </Text>  
                        </TouchableOpacity>  
                </View>    
                <View style = {styles.creator} > 
                    <Text style = {styles.creatorText}> A Cun114 Production © 2019</Text>
                </View> 
            </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FDC741',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
   
    signupTextCont: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        flexDirection: 'row'
    },
    signupText: {
        color: 'gray',
        fontSize: 16
    },
    signupButton: {
        color: '#414194',
        fontSize: 18, 
        fontWeight: '700'
    },
    creator: {
        width: width, 
        padding: 5,
        backgroundColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center'
    },
    creatorText: {
        color: 'gray',
        textAlign: 'center'
    }
});

export default Login;