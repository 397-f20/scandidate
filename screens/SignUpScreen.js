import React, { useEffect, useState } from "react";
import { Button, Image, Text, TextInput, View, StyleSheet } from "react-native";
import { Menu, useTheme } from "react-native-paper";
import { firebase } from "../firebase";
const db = firebase.database().ref("users");

const SignUpScreen = ({ navigation, auth, setAuth, user, setUser }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupError, setSignupError] = useState("");
  const [role, setRole] = useState("Select your role");

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const { colors } = useTheme();



  async function onSignUp() {
    setSignupError("");
    if(role == "Select your role"){
        setSignupError("Please select your role")
        return
    }
    if(email == ""){
        setSignupError("Please provide an email address")
        return
    }
    if(password != confirmPassword){
        setSignupError("Password does not match")
        return
    }
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
      }
    };
    if(role == "Student"){
        //do something
    }
    if(role == "Recruiter"){
        firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch((err) => setSignupError(err.message))
        .then(signUpAction);
    }

  }

  const selectRole = (
    <Text style={styles.roleSelect} onPress={openMenu}>
      {role}
    </Text>
  );
  const menu = (
    <Menu
      visible={menuVisible}
      onDismiss={closeMenu}
      anchor={selectRole}
      contentStyle={{ backgroundColor: colors.background }}
    >
      <Menu.Item
        onPress={() => {
          closeMenu();
          setRole("Student");
        }}
        title="Student"
      />
      <Menu.Item
        onPress={() => {
          closeMenu();
          setRole("Recruiter");
        }}
        title="Recruiter"
      />
    </Menu>
  );

  return (
    <View style={styles.container}>
      <Image
        source={require("../icon.png")}
        style={{ height: 100, width: 100 }}
      />
      <Text>Scandidate</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text>Role:</Text>
        {menu}
      </View>
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
      <TextInput
        value={confirmPassword}
        onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
        placeholder={"Confirm Password"}
        secureTextEntry={true}
        style={styles.input}
      />
     <Button title={"Sign Up"} style={styles.input} onPress={onSignUp} />
     <Text>{signupError}</Text> 
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
  },
  roleSelect: {
    backgroundColor: "white",
    padding: 5,
    borderBottomWidth: 2,
    width: 125
  }
});

export default SignUpScreen;
