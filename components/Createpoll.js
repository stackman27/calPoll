import React, { Component } from 'react'
import { View,StyleSheet, Platform, Dimensions, TouchableOpacity, TextInput } from 'react-native'
import { Input, Icon, Text, Badge, Button } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import randomColor from 'randomcolor'
import firebase from '../Firebase'; 
 
var { width } = Dimensions.get("window");


class Createpoll extends Component {

    static navigationOptions = ({ navigation }) => {
   
        return { 
          headerLeft: ( 
            <Text style = {{marginLeft: 20, marginTop: 30, fontSize: 32, fontWeight: 'bold', height: '100%'}}> Create Poll </Text>
            ),
          headerRight: (
            <View style = {{flex: 1, flexDirection: 'row'}}>  
            <Icon raised reverse reverseColor = '#1D71F2'  name='home' type='material' color='#1D71F2' iconStyle = {{color: 'white', fontSize: 24, fontWeight: 'bold'}} size = {20}  onPress={() => navigation.navigate('PollScreen')} />
            <Icon raised reverse reverseColor = '#1D71F2'  name='person' type='material' color='#1D71F2' size = {20} iconStyle = {{color: 'white', fontSize: 24, fontWeight: 'bold'}}  containerStyle = {{  marginRight: 10}} onPress={() => navigation.navigate('MyProfileScreen')} />
          </View>

             
            ),
            
            headerStyle: { 
                height: 75, 
                borderColor: '#eee',
                
                shadowOffset: {width: 0, height: 5},
                  shadowOpacity: 0.1, 
                  shadowRadius: 6,
            }

        };
      };

    
    constructor (props) {
        super();
        this.ref = firebase.firestore().collection('polls');
        
        this.state = {
            poll0: '',
            poll1: '',
            poll2: '',
            poll3: '',
            currentUser: null,
            textInput: [],
            addtxtInputs: 0
        }
    }

    updateTextInput = (text, field) => {
        const state = this.state; 
        state[field] = text;
        this.setState(state);
    }

    componentDidMount() {
      const { currentUser } = firebase.auth()
      this.setState({ currentUser})
    }

    addTextInput = (key) => {
      let textInput = this.state.textInput;

      textInput.push(
        <TextInput
        key = {key}
        style={styles.inputBox}
        underlineColorAndroid="rgba(0,0,0,0)"
        placeholder= {key}
        placeholderTextColor="gray" 
        value= {this.state.key}
        onChangeText={(text) => this.updateTextInput(text, key)}
      />   
     ); 

      this.setState({ textInput, addtxtInputs: this.state.addtxtInputs + 1})
      console.log(this.state.addtxtInputs);
    }

    saveBoard() {
    
      var storedata = {};

      if(this.state.poll2 == '' && this.state.poll3 == ''){
        storedata = {
          poll1: this.state.poll0, 
          poll1vote: 0,
          poll2: this.state.poll1,
          poll2vote: 0,
        }
      } else if(this.state.poll3 == '') {
        storedata = {
          poll1: this.state.poll0, 
          poll1vote: 0,
          poll2: this.state.poll1,
          poll2vote: 0, 
          poll3: this.state.poll2, 
          poll3vote: 0,
        }
      } else {
        storedata = {
          poll1: this.state.poll0, 
          poll1vote: 0,
          poll2: this.state.poll1,
          poll2vote: 0, 
          poll3: this.state.poll2, 
          poll3vote: 0, 
          poll4: this.state.poll3,
          poll4vote: 0, 
        }
      }

      console.log(storedata);
          this.ref.add({
            storedata,
            userid: this.state.currentUser.uid,
            voted: false,
        }).then((docRef) => {
            this.setState({
                poll1: '',
                poll2: '', 
            })
            this.props.navigation.goBack();
        }).catch((error) => {
            console.error("Error adding document: ", error);
        })    
    }
 
    render() {
  
        return (
            <View style = {{marginTop: 20, padding: 20, justifyContent:'center', alignItems: 'center'}}> 

        <TextInput 
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder= "Poll0"
          placeholderTextColor="gray" 
          value= {this.state.poll0}
          onChangeText={(text) => this.updateTextInput(text, 'poll0')}
        />   

      <TextInput 
        style={styles.inputBox}
        underlineColorAndroid="rgba(0,0,0,0)"
        placeholder= 'Poll1'
        placeholderTextColor="gray" 
        value= {this.state.poll1}
        onChangeText={(text) => this.updateTextInput(text, 'poll1')}
      />   

        {this.state.textInput.map((value, index) => {
          return value
        })}

        {this.state.addtxtInputs >= 2 ?
        null :  
          <TouchableOpacity style={styles.button} onPress={() => this.addTextInput("poll" + (this.state.textInput.length + 2) )}>
            <Text style={styles.buttonText}>Add Poll</Text>
          </TouchableOpacity>
        }

        <TouchableOpacity style={styles.button} onPress={() => this.saveBoard()}>
          <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputBox: {
        backgroundColor: "#E3F4FE",
        width: 335,
        borderBottomColor: "gray",
        borderBottomWidth: 0,
        borderRadius: 10,
    
        paddingLeft: 20,
        fontSize: 16,
        color: "black",
    
        marginVertical: 10,
        ...Platform.select({
          ios: {
            padding: 15
          },
          android: {
            padding: 10
          }
        })
      },

      button: {
        width: 300,
        backgroundColor: "#1D71F2",
        borderRadius: 25,
        marginVertical: 25,
        paddingVertical: 13
      },

      buttonText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#ffffff",
        textAlign: "center"
      }
})

export default  Createpoll;