import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import Logo from "./Logo";
import SignUpUser from "./ModelForms/SignupUser";

class SignUp extends React.Component {
  _gotoSignin = () => {
    this.props.navigation.navigate("Login");
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Sign up</Text>

        <SignUpUser />

        <View style={styles.signupTextCont}>
          <TouchableOpacity onPress={this._gotoSignin}>
            <Text style={styles.signupButton}> Back </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
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
    color: "#fff",
    fontSize: 16
  },
  signupButton: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700"
  },

  title: {
    marginVertical: 75,
    fontWeight: "bold",
    color: "#E3F4FE",
    fontSize: 60,
    color: '#000',
  }
});

export default SignUp;
