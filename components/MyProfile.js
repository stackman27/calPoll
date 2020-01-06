import React, { Component } from 'react'
import { View, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'
import { Icon, Text, Badge } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import randomColor from 'randomcolor'
import firebase from '../Firebase';
 
var { width } = Dimensions.get("window");


class MyProfile extends Component {
    
    static navigationOptions = ({ navigation }) => {
   
        return { 
          headerLeft: ( 
            <Text style = {{marginLeft: 20, marginTop: 30, fontSize: 32, fontWeight: 'bold', height: '100%'}}> My Profile </Text>
            ),
          headerRight: (
            <View style = {{flex: 1, flexDirection: 'row'}}>  
            <Icon raised reverse reverseColor = '#1D71F2'  name='home' type='material' color='#1D71F2' iconStyle = {{color: 'white', fontSize: 24, fontWeight: 'bold'}} size = {20} onPress={() => navigation.navigate('PollScreen')}  />
            <Icon raised reverse reverseColor = '#1D71F2'  name='add' type='material' color='#1D71F2' size = {20} iconStyle = {{color: 'white', fontSize: 24, fontWeight: 'bold'}}  containerStyle = {{  marginRight: 10}}   onPress={() => navigation.navigate('CreatePollScreen')} />
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

      constructor(props) {
        super(props)
 
        this.userid = firebase.auth().currentUser.uid;
        this.ref =  firebase.firestore().collection("polls").where("userid", "==", this.userid);
        this.unsubscribe = null;


        this.state = {
             mypolls: {}
        }
      }
 
      onCollectionUpdate = (querySnapshot) => {
        
        const mypolls = [];
        querySnapshot.forEach((doc) => {
            mypolls.push(doc.data())
        })

        this.setState({
            mypolls
        })

        console.log("MYPOLLSSS", this.state.mypolls);

  }

      componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate); 
      }

 

      _renderItem ({item, index}) {
        return (
           <View style={{marginBottom: 20, height: 550}}>
              
                 <View style = {{backgroundColor: '#eee', borderTopRightRadius: 20, borderTopLeftRadius: 20, height: '30%', justifyContent: 'center', alignItems: 'center'}}>  
                 <TouchableOpacity>  
                     <Text style = {{fontSize: 36, fontWeight: 'bold', color: 'gray'}}> { item.poll1 }</Text>
                     </TouchableOpacity>
                 </View>
             
     
               
                 <View style = {{ backgroundColor: randomColor(), borderBottomLeftRadius: 20, borderBottomRightRadius: 20, height: '70%', justifyContent: 'center', alignItems: 'center'}}> 
                     <TouchableOpacity  >
                         <Text style = {{fontSize: 26, fontWeight: 'bold', color: 'white'}}> { item.poll2 } </Text> 
                     </TouchableOpacity>
                 </View> 
            
           </View>
     );}

    render() {
        return (
            <View style = {{flex: 1}}>

                <View style = {{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 30}}>  

                    <View style = {{alignItems: 'center'}}> 
                        <Text style = {{fontSize: 22, fontWeight: 'bold', }}> 100 </Text>
                        <Text> Total Polls</Text>
                    </View>

                    <View style = {{alignItems: 'center'}}> 
                        <Text style = {{fontSize: 22, fontWeight: 'bold', }}> 10 </Text>
                        <Text> Ans. Polls </Text>
                    </View>

                    <View style = {{alignItems: 'center'}}> 
                        <Text style = {{fontSize: 22, fontWeight: 'bold', }}> 90 </Text>
                        <Text> UnAns. Polls </Text>
                    </View>

                </View>

                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={this.state.mypolls}
                    renderItem={this._renderItem}
                    sliderWidth={width}
                    itemWidth={300}
                    layout={'default'}  
                />
 
 
            </View>
        )
    }
}


const styles = StyleSheet.create({
    answerShow: {
        fontSize: 42,
        fontWeight: 'bold',
        color: 'white',
        
      }
})

export default MyProfile