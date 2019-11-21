import React, { Component } from 'react'
import { View, Dimensions, TouchableOpacity } from 'react-native'
import { Icon, Text, Badge } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import randomColor from 'randomcolor'

var { width } = Dimensions.get("window");


class MyProfile extends Component {
    
    static navigationOptions = ({ navigation }) => {
   
        return { 
          headerLeft: ( 
            <Text style = {{marginLeft: 20, marginTop: 30, fontSize: 32, fontWeight: 'bold', height: '100%'}}> My Profile </Text>
            ),
          headerRight: (
            <Icon raised name='home' type='font-awesome' color='#f50' size = {20} containerStyle = {{marginRight: 10}} onPress={() => navigation.navigate('PollScreen')} />
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

      constructor() {
        super()
        this.state = {
            entries: [
                { title: 'hello World' },
                { title: 'Hello Again' },
                { title: 'hello World' },
                { title: 'Hello Again' },
                { title: 'hello World' },
                { title: 'Hello Again' },
                
              ]
        }
      }

      _renderItem ({item, index}) {
        return (
           <View style={{marginBottom: 20, height: 300 , flex: 1}}>
              
                 <View style = {{backgroundColor: '#eee', borderTopRightRadius: 20, borderTopLeftRadius: 20,  flex: 2, justifyContent: 'center', alignItems: 'center'}}>  
                 <TouchableOpacity>  
                     <Text style = {{fontSize: 36, fontWeight: 'bold', color: 'gray'}}> { item.title }</Text>
                     </TouchableOpacity>
                 </View>
             
     
               
                 <View style = {{ backgroundColor: randomColor(), borderBottomLeftRadius: 20, borderBottomRightRadius: 20, flex: 4, justifyContent: 'center', alignItems: 'center'}}> 
                     <TouchableOpacity  >
                         <Text style = {{fontSize: 26, fontWeight: 'bold', color: 'white'}}> loren ipsum doren </Text> 
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
                data={this.state.entries}
                renderItem={this._renderItem}
                sliderWidth={width}
                itemWidth={300}
                layout={'default'}  
            />

            </View>
        )
    }
}


export default MyProfile