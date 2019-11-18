import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
   Image,
   Platform
} from 'react-native';

export default class Logo extends Component  {
	render(){
		return(
			<View style={styles.container}> 
          		<Text style={styles.logoText}>cal-Poll</Text>	
  			</View>
			)
	}
}

const styles = StyleSheet.create({
  container : {
    flexGrow: 1,
   justifyContent: 'center',
    alignItems: 'center'
  },
  
  logoText : { 
    marginVertical: 15, 
    fontWeight: 'bold',
  	color:'#E3F4FE',
      ...Platform.select({
        ios: {
          fontSize:60,
        },
        android: {
          fontSize:52,
        },
      }),
  },
});