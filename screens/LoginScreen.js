import React, { useEffect, useState } from "react";
import {
  Button,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { firebase } from "../firebase";

const db = firebase.database().ref("users");

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [userRole, setUserRole] = useState("");

  async function onLogin() {
    // navigation.navigate("tabs"); //for easier debugging...
    var errorCode = "success";
    const loginAction = () => {
      if (errorCode != "success") return;
      let curId = firebase.auth().currentUser.uid;
      db.child(curId).once("value", (snapshot) => {
        var curRole = snapshot.child("role").val();
        if (curRole == "Student") navigation.navigate("student");
        else if (curRole == "Recruiter") navigation.navigate("tabs");
      });
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
  };
  return (
    <View style={styles.container}>
      <Image
        source={require("../icon.png")}
        style={{ height: 100, width: 100 }}
      />
      <Text style={{ fontSize: 40 }}>Scandidate</Text>
      <Text style={{ fontSize: 30 }}>Login</Text>
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
      <View style={{ flexDirection: "column" }}>
        <Button title={"Login"} style={styles.input} onPress={onLogin} />
        <TouchableOpacity onPress={() => navigation.navigate("signup")}>
          <Text>Sign Up</Text>
        </TouchableOpacity>
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
