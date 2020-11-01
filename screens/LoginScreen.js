import React, { useEffect, useState } from "react";
import { Button, Text, TextInput, View, StyleSheet } from "react-native";
import { firebase } from "../firebase";

const LoginScreen = ({ navigation, auth, setAuth, user, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const onLogin = () => {
    console.log("login entered");
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(navigation.navigate("tabs"))
      .catch(err => console.log(err.message));
  };

  const onSignUp = () => {
    console.log("sign up entered");
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(err => setLoginError(err.message));
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 40 }}>Scandidate</Text>
      <Text style={{ fontSize: 40 }}>Recruiter Login</Text>
      <TextInput
        value={email}
        onChangeText={email => setEmail(email)}
        placeholder={"Email"}
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={password => setPassword(password)}
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
    backgroundColor: "#ecf0f1"
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginHorizontal: 10,
    marginBottom: 10
  }
});

export default LoginScreen;
