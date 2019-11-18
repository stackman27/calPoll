import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import Logo from './Logo'; 
import SignUpUser from './ModelForms/SignupUser';


class SignUp extends React.Component { 
  

    _gotoSignin = () =>{
        this.props.navigation.navigate('LoginScreen'); 
    }

 
  render(){
    return (
      <View style = {styles.container}>
            <Logo />
             
             <SignUpUser />

             
             <View style = {styles.signupTextCont}> 
                  <Text style = {styles.signupText}> Already have an account? </Text>
                    <TouchableOpacity onPress = {this._gotoSignin}> 
                        <Text style = {styles.signupButton}> SignIn </Text>
                    </TouchableOpacity> 
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
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 16
    },
    signupButton: {
        color: '#ffffff',
        fontSize: 18, 
        fontWeight: '700'
    }
});

export default SignUp;