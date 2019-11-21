import React from 'react';
import { StyleSheet, Text, View, Button, StatusBar} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import randomColor from 'randomcolor'
import { TouchableOpacity } from 'react-native-gesture-handler';
 

class PollScreen extends React.Component {

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
      <View style={{marginBottom: 20, marginTop: 20, height: 300 , flex: 1, }}>
         
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
 render () {
   return (
       <View style = {styles.container}> 
 
        <Carousel
            ref={(c) => { this._carousel = c; }}
            data={this.state.entries}
            renderItem={this._renderItem}
            sliderWidth={350}
            itemWidth={300}
            layout={'default'} 
           
           
        />

    </View>
); 
}} 


    const styles = StyleSheet.create({
        container: {
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    }});

   export default PollScreen;
