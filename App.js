import React from 'react';
import {StyleSheet, TextInput,  Form, Text, View, StatusBar, FlatList, TouchableOpacity, Button, Dimensions, Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Leaderboards from './components/Leaderboards'
import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import PollScreen from './components/PollScreen';

const MainNavigator = createStackNavigator({
  PollScreen: 
  {screen: PollScreen,
    navigationOptions: {
      headerLeft: <Text style = {{marginLeft: 20, marginTop: 30, fontSize: 32, fontWeight: 'bold', height: '100%'}}> Cal Poll </Text>,
      headerRight: <Icon raised name='history' type='font-awesome' color='#f50' size = {20} containerStyle = {{marginRight: 10}} onPress={() => console.log('hello')} />,

      headerStyle: { 
         height: 75, 
         borderColor: '#eee',
         
         shadowOffset: {width: 0, height: 5},
          shadowOpacity: 0.1, 
          shadowRadius: 6,
      }
    }
  },
  
  Login: 
      {screen: Login,
        navigationOptions: {
          header: null
        }
      },

  Signupscreen: 
      {
        screen: SignUp,
        navigationOptions: {
          header: null,
        }
      },
 
 /*  PollScreen: 
  {screen: PollScreen,
    navigationOptions: {
      header: null
    }
  }, */

}, {headerMode: 'screen'});

const App = createAppContainer(MainNavigator);

export default App;