import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Dimensions
} from "react-native";

import Logo from "./Logo";
import LoginComponent from "./ModelForms/LoginComponent";
// color template: https://www.schemecolor.com/apple-weather-app-icon-2017-colors.php

var { width } = Dimensions.get("window");

class Login extends React.Component {
  _gotoSignup = () => {
    this.props.navigation.navigate("Signupscreen");
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 2 }}> 
          <Logo />

          <View style={styles.fidgetSpinner}></View>
        </View>

        <View style={{ backgroundColor: "#fff", flex: 5 }}>
          <LoginComponent type="Login" pressChange={this.props.navigation} />

          <View style={styles.signupTextCont}>
            <TouchableOpacity onPress={this._gotoSignup}>
              <Text style={styles.signupButton}> Create an Account </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.creator}>
            <Text style={styles.creatorText}> A Cun114 Production © 2019</Text>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1D71F2",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  signupTextCont: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    flexDirection: "row"
  },
  signupText: {
    color: "gray",
    fontSize: 16
  },
  signupButton: {
    color: "#000",
    fontSize: 18,
    fontWeight: "700"
  },
  creator: {
    width: width,
    padding: 5,
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center"
  },
  creatorText: {
    color: "gray",
    textAlign: "center"
  }
});

export default Login;
