import React from 'react';
import {StyleSheet, TextInput,  Form, Text, View, StatusBar, FlatList, TouchableOpacity, Button, Dimensions, Platform } from 'react-native';
 
import Login from './components/Login';
import SignUp from './components/SignUp'; 
import Loading from './components/Loading';
import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import PollScreen from './components/PollScreen';
import MyProfile from './components/MyProfile';
import Createpoll from './components/Createpoll';
 

const MainNavigator = createStackNavigator({

  LoadingScreen: {
    screen: Loading,
    navigationOptions: {
      header: null
    }
  },

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
 
      PollScreen:  { screen: PollScreen,  },

      MyProfileScreen:  { screen: MyProfile, },

      CreatePollScreen: { screen: Createpoll, }
      

}, {headerMode: 'screen'});

const App = createAppContainer(MainNavigator);

export default App;