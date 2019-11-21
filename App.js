import React from 'react';
import {StyleSheet, TextInput,  Form, Text, View, StatusBar, FlatList, TouchableOpacity, Button, Dimensions, Platform } from 'react-native';
 
import Login from './components/Login';
import SignUp from './components/SignUp';
import Leaderboards from './components/Leaderboards'
import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import PollScreen from './components/PollScreen';
import MyProfile from './components/MyProfile';

const MainNavigator = createStackNavigator({
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
 
      PollScreen: 
      { screen: PollScreen,  },

       MyProfileScreen:  { screen: MyProfile, }  
      

}, {headerMode: 'screen'});

const App = createAppContainer(MainNavigator);

export default App;