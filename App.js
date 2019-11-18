import React from 'react';
import {StyleSheet, TextInput,  Form, Text, View, StatusBar, FlatList, TouchableOpacity, Button, Dimensions, Platform } from 'react-native';

import Login from './components/Login';
import SignUp from './components/SignUp';
import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
 

const MainNavigator = createStackNavigator({
  LoginScreen: 
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


}, {headerMode: 'screen'});

const App = createAppContainer(MainNavigator);

export default App;