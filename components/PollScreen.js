import React from 'react';
import { StyleSheet, View, StatusBar, Dimensions, TouchableHighlight, TouchableOpacity, FlatList, RefreshControl} from 'react-native';
import { Icon, Text, Overlay, Button } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import randomColor from 'randomcolor'
import firebase from '../Firebase';  
 
var { width } = Dimensions.get("window");

class PollScreen extends React.Component {

    static navigationOptions = ({ navigation }) => { 
        return { 
          headerLeft: ( 
            <Text style = {{marginLeft: 20, marginTop: 30, fontSize: 32, fontWeight: 'bold', height: '100%'}}> Pollar </Text>
            ),
          headerRight: (
            <View style = {{flex: 1, flexDirection: 'row'}}>  
                <Icon raised reverse reverseColor = '#1D71F2'  name='person' type='material' color='#1D71F2' iconStyle = {{color: 'white', fontSize: 24, fontWeight: 'bold'}} size = {20} onPress={() => navigation.navigate('MyProfileScreen')} />
                <Icon raised reverse reverseColor = '#1D71F2'  name='add' type='material' color='#1D71F2' size = {20} iconStyle = {{color: 'white', fontSize: 24, fontWeight: 'bold'}}  containerStyle = {{  marginRight: 10}}  onPress={() => navigation.navigate('CreatePollScreen')} />
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
 
        this.checkvote = firebase.firestore().collection('checkvote');
        this.unsubscribe = null;
        this.unsubscribecv = null;

        this.state = {
           polls: {},
           checkvoted: [],
           currentUser: null, 
           showvoted: false,
           isVisible: false,
        }
         
        this.pollPressUpdate = this.pollPressUpdate.bind(this);
      }
 
      onCollectionUpdate = () => {
         
        const polls = [];
        firebase.firestore().collection('polls').get().then((snapshot) => {
       
        snapshot.docs.forEach(doc => {  
          const {poll1, poll1vote, poll2, poll2vote, poll3, poll3vote, poll4, poll4vote} = doc.data().storedata;
           
          // Before showing each post 
          // Check if the (post id from polls and currentUserid exist) in current frame
       
             if(!this.state.checkvoted.includes(doc.id)) {
              polls.push({
                key: doc.id,
                poll1, 
                poll1vote,
                poll2, 
                poll2vote,
                poll3,
                poll3vote, 
                poll4,
                poll4vote,
                userid: doc.data().userid,
                voted: doc.data().voted, 
                displayVote: false,  
              });  
          }  
        });
        
        this.setState({
          polls,
          isVisible: false,
        })

        });

         
      }

      oncheckvoteUpdate = (querySnapshot) => {

       const checkvoted = [];
       querySnapshot.forEach((doc) => {
         
        if(firebase.auth().currentUser.uid == doc.data().userid){
          checkvoted.push(doc.data().pollid)
        }

       })

       this.setState({
         checkvoted
       })
 
      }

     
      componentDidMount() { 

        this.unsubscribe = this.checkvote.onSnapshot(this.oncheckvoteUpdate);
        this.onCollectionUpdate();
   
        const { currentUser } = firebase.auth()
        this.setState({ currentUser})
       
      }

      // checking to see if the user has already voted on a poll or not 
       
      pollPressUpdate(pollidkey, pollid, pressPoll){ 
    
        this.onAnswerUpdate(pollidkey, pollid);
        this.addUserVoted(pollidkey);
 
        pressPoll.displayVote = true;
 
        this.setState({
          showvoted: true
        })

      }

      onAnswerUpdate(pollidkey, pollid){
       
        const updatevote = firebase.firestore().collection('polls').doc(pollidkey);
        const increment = firebase.firestore.FieldValue.increment(1);
  
       if(pollid == 1) {
          updatevote.update ({ 
            "storedata.poll1vote": increment,
            voted: true, 
          })
        }
        else if(pollid == 2) {
          updatevote.update({ 
            "storedata.poll2vote":  increment,
            voted: true, 
          })
        } else if(pollid == 3) {
          updatevote.update({
            "storedata.poll3vote":  increment,
            voted: true, 
          })
        } else{
          updatevote.update({
            "storedata.poll4vote":  increment,
            voted: true, 
          })
        }  
 
 
      }

      addUserVoted = (pollidkey) => {

        const adduservote = firebase.firestore().collection('checkvote'); 
        adduservote.add({ 
          pollid: pollidkey,
          userid: this.state.currentUser.uid,
          voted: true, 
        })
 
      }

       
     
  _renderItem  = ({item, index}) => {
    return (
     
        <View style={{marginBottom: 20, height: 600,}}>
        
        <TouchableOpacity  onPress = {() => this.pollPressUpdate(item.key, 1, item)} style = {{backgroundColor: randomColor(), borderTopRightRadius: 20, borderTopLeftRadius: 20, height: '50%',  justifyContent: 'center', alignItems: 'center'}}>  
          <View style = {{justifyContent: 'center', alignItems: 'center'}}>  

              <Text style = {{ fontSize: 36, fontWeight: 'bold', color: 'white'}}> { item.poll1 }</Text>   

            {item.displayVote ? 
              <Text style = {styles.answerShow}> { Number(((item.poll1vote / (item.poll1vote + item.poll2vote))) * 100).toFixed(1) }% </Text>  
            : null
            }

          </View>
        </TouchableOpacity>

          
        <TouchableHighlight  onPress = {() => alert("Hello World") } style = {{ backgroundColor: randomColor(), borderBottomLeftRadius: 20, borderBottomRightRadius: 20, height: '50%', justifyContent: 'center', alignItems: 'center'}}>  
          <View style = {{justifyContent: 'center', alignItems: 'center'}}> 
                  <Text style = {{  fontSize: 36, fontWeight: 'bold', color: 'white'}}> {item.poll2} </Text> 

            {item.displayVote ?  
                  <Text style = {styles.answerShow}>  { Number(((item.poll2vote / (item.poll1vote + item.poll2vote))) * 100).toFixed(1)}%  </Text>
            :
             null
            }

          </View> 
          </TouchableHighlight>
    
      </View> 

  );}

 
 render () {

    const { currentUser } = this.state;
    
   return (
       <View style = {styles.container}> 
          {/* <Text> {currentUser && currentUser.uid }! </Text>  */}

          <Overlay isVisible={this.state.isVisible} width = {50} height = {50}>
              <Button
               title="Loading button"
               loading
               type="clear"
               
              />
          </Overlay>

        <Carousel
            ref={(c) => { this._carousel = c; }}
            data= {this.state.polls}
            extraData = {this.state.showvoted}
          
            renderItem={({item, index }) => (
            <View style = {{marginBottom: 20, height: 600, }}> 
              <View style = {{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch'}}>
                
                <TouchableHighlight disabled = {item.displayVote} onPress = {() => this.pollPressUpdate(item.key, 1, item)} style = {{flex: 1, backgroundColor: '#FFCE45', borderTopRightRadius: 20, borderTopLeftRadius: 20,   justifyContent: 'center', alignItems: 'center'}}> 
                  <View style = {{justifyContent: 'center', alignItems: 'center'}}>  
  
                  <Text style = {{ fontSize: 36, fontWeight: 'bold', color: 'white'}}> { item.poll1 }</Text>   

                  {item.displayVote ? 
                  <Text style = {{...styles.answerShow, ...{color: 'black'} }}> { Number(((item.poll1vote / (item.poll1vote + item.poll2vote))) * 100).toFixed(1) }% </Text>  
                  : null
                  }

                  </View>
                </TouchableHighlight>

                <TouchableHighlight disabled = {item.displayVote} onPress = {() => this.pollPressUpdate(item.key, 2, item)} style = {{flex: 1, backgroundColor: '#DD4F42',  justifyContent: 'center', alignItems: 'center'}}> 
                <View style = {{justifyContent: 'center', alignItems: 'center'}}> 
                        <Text style = {{  fontSize: 36, fontWeight: 'bold', color: 'white'}}> {item.poll2} </Text> 

                  {item.displayVote ?  
                        <Text style = {{...styles.answerShow, ...{color: 'white'} }}>  { Number(((item.poll2vote / (item.poll1vote + item.poll2vote))) * 100).toFixed(1)}%  </Text>
                  :
                   null
                  }

                </View> 
                </TouchableHighlight>
                
                
                {item.poll3 != undefined ? 

                <TouchableHighlight disabled = {item.displayVote} onPress = {() => this.pollPressUpdate(item.key, 3, item)} style = {{flex: 1, backgroundColor: '#1BA160',   justifyContent: 'center', alignItems: 'center'}}>
                <View style = {{justifyContent: 'center', alignItems: 'center'}}>  
 
                    <Text style = {{ fontSize: 36, fontWeight: 'bold', color: 'white'}}> { item.poll3 }</Text>   

                    {item.displayVote ? 
                    <Text style = {{...styles.answerShow, ...{color: 'black'} }}> { Number(((item.poll1vote / (item.poll1vote + item.poll2vote))) * 100).toFixed(1) }% </Text>  
                    : null
                    }

                </View>
              
                </TouchableHighlight>

                : null  
                }

                {item.poll4 != undefined  ? 
                <TouchableHighlight disabled = {item.displayVote} onPress = {() => this.pollPressUpdate(item.key, 4, item)} style = {{flex: 1, backgroundColor: '#4D8CF4', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, justifyContent: 'center', alignItems: 'center'}}>
                <View style = {{justifyContent: 'center', alignItems: 'center'}}> 
                        <Text style = {{  fontSize: 36, fontWeight: 'bold', color: 'white'}}> {item.poll4} </Text> 

                  {item.displayVote ?  
                        <Text style = {{...styles.answerShow, ...{color: 'white'} }}>  { Number(((item.poll2vote / (item.poll1vote + item.poll2vote))) * 100).toFixed(1)}%  </Text>
                  :
                   null
                  }

                </View> 
                </TouchableHighlight>
                : null
                }

              </View>
            </View>
            )}
  
            sliderWidth={width}
            itemWidth={300}
            layout={'default'}   
            onSnapToItem =  {(index) => {

              let lastIndex = this.state.polls.length - 1; 
              if(index === lastIndex) {
                this.setState({
                  isVisible: true
                })
                this.onCollectionUpdate();
              }

            }}
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
        },

        answerShow: {
          fontSize: 48,
          fontWeight: 'bold',
          color: 'white',
          
        }
  
  });

   export default PollScreen;
