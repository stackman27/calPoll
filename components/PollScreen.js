import React from "react";
import { StyleSheet, View, Button, StatusBar, Dimensions } from "react-native";
import { Icon ,Text } from "react-native-elements";
import Carousel from "react-native-snap-carousel";
import randomColor from "randomcolor";
import { TouchableOpacity } from "react-native-gesture-handler";

var { width } = Dimensions.get("window");

class PollScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <Icon
          reverse
          name="menu"
          type="feather"
          color="#1D71F2"
          size={25}
          containerStyle={{ marginLeft: 30 }}
          onPress={() => navigation.navigate("MyProfileScreen")}
        />
        /**
         * <Text
          style={{
            marginLeft: 20,
            marginTop: 30,
            fontSize: 32,
            fontWeight: "bold",
            height: "100%",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {" "}
          Polls{" "}
        </Text>
         */
      ),
      headerRight: (
        <Icon
          reverseColor
          name="user"
          type="feather"
          color="#1D71F2"
          size={25}
          containerStyle={{ marginRight: 30 }}
          onPress={() => navigation.navigate("MyProfileScreen")}
        />
      ),

      headerStyle: {
        height: 40,
        shadowColor: 'transparent',
      }
    };
  };

  constructor() {
    super();
    this.state = {
      entries: [
        { title: "Berkeley or UCLA?" },
        { title: "Hello Again" },
        { title: "hello World" },
        { title: "Hello Again" },
        { title: "hello World" },
        { title: "Hello Again" }
      ]
    };
  }

  _renderItem({ item, index }) {
    return (
      <View style={{ marginBottom: 20, height: 300, flex: 1 }}>
        {/**
         * <View
          style={{
            backgroundColor: "#eee",
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        > 
          <TouchableOpacity>
            <Text
              style={{
                fontSize: 25,
                fontWeight: "bold",
                color: "gray",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {" "}
              {item.title}
            </Text>
          </TouchableOpacity>
        </View>
         */}
        
        <View
          style={{
            flex: 1
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#6CD580",
              justifyContent: "center",
              alignItems: "center",
              height: 320,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              borderWidth: 1,
              borderColor: "#6CD580"
            }}
          >
            <Text style={{ fontSize: 30, fontWeight: "bold", color: "white" }}>
              {" "}
              Berkeley{" "}
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#5BC4DA",
              justifyContent: "center",
              alignItems: "center",
              height: 320,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              borderWidth: 1,
              borderColor: "#5BC4DA"
            }}
          >
            <Text style={{ fontSize: 30, fontWeight: "bold", color: "white" }}>
              {" "}
              UCLA{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          data={this.state.entries}
          renderItem={this._renderItem}
          sliderWidth={width}
          itemWidth={300}
          layout={"default"}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30
  }
});

export default PollScreen;
