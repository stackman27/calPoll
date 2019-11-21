import React from 'react';
import {StyleSheet, TextInput,  Form, Text, View, StatusBar, FlatList, TouchableOpacity, Button, Dimensions, Platform } from 'react-native';

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
      title: 'Cal Poll',
      headerStyle: {
         height: 60,
         borderColor: 'gray',
         borderWidth: 1, 
         borderBottomLeftRadius: 20,
         borderBottomRightRadius: 20,
         shadowOffset: {width: 0, height: 5},
          shadowOpacity: 0.01, 
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