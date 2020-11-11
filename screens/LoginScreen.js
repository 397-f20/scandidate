import React, { useEffect, useState } from "react";
import { Button, Image, Text, TextInput, View, StyleSheet } from "react-native";
import { firebase } from "../firebase";

const db = firebase.database().ref("users");

const LoginScreen = ({ navigation, auth, setAuth, user, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  async function onLogin() {
    var errorCode = "success";
    const loginAction = () => {
      if (errorCode == "success") {
        navigation.navigate("tabs");
      }
    };
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function (error) {
        // Handle Errors here.
        errorCode = error.code;
        setLoginError(error.message);
      })
      .then(loginAction);
  }

  async function onSignUp() {
    var errorCode = "success";
    const signUpAction = () => {
      if (errorCode == "success") {
        user = firebase.auth().currentUser.uid;
        // update the list of users
        db.update({
          [user]: {
            Folders: { Favorites: [-1] },
          },
        });
        // make a new favorites folder for the new user
      }
    };
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => setLoginError(err.message))
      .then(signUpAction);
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../icon.png")}
        style={{ height: 100, width: 100 }}
      />
      <Text style={{ fontSize: 40 }}>Scandidate</Text>
      <Text style={{ fontSize: 30 }}>Recruiter Login</Text>
      <TextInput
        value={email}
        onChangeText={(email) => setEmail(email)}
        placeholder={"Email"}
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={(password) => setPassword(password)}
        placeholder={"Password"}
        secureTextEntry={true}
        style={styles.input}
      />
      <View style={{ flexDirection: "row" }}>
        <Button title={"Login"} style={styles.input} onPress={onLogin} />
        <Button title={"Sign Up"} style={styles.input} onPress={onSignUp} />
      </View>
      <Text>{loginError}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginHorizontal: 10,
    marginBottom: 10,
  },
});

export default LoginScreen;
