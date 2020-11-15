import React, { createContext, useContext, useEffect, useState } from "react";
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
const UserContext = createContext();

const LoginScreen = ({ navigation, auth, setAuth, user, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [userRole, setUserRole] = useState("");

  // const [uid, setUid] = useState(auth.uid);
  const userC = useContext(UserContext);

  /* useEffect(() => {
    firebase.auth().onAuthStateChanged((auth) => {
      //const isStudent = auth.uid && db.child(auth.uid).role === "Student";
      console.log(
        "child",
        db.child("7KbnZ2IPahXlwmswAZvStirsdLw2/role")

        // .ref("users/" + firebase.auth().currentUser.uid + "/Folders")
      );
    });
  }, []);

  useEffect(() => {
    const db =
      firebase.auth() && firebase.auth().currentUser
        ? firebase.database().ref(firebase.auth().currentUser.uid + "/role")
        : null;

    const handleData = (snapshot) => {
      if (snapshot.val()) {
        setUserRole(snapshot.val());
        console.log(userRole);
      }
    };
    db.on("value", handleData, (error) => alert(error));

    if (auth.uid && db.child(auth.uid).role === "Student")
      navigation.navigate("student");
    else if (auth.uid && db.child(auth.uid).role === "Recruiter")
      navigation.navigate("tabs");
    else console.log("neither role found");

    return () => {
      db.off("value", handleData);
    };
  }, []); */

  async function onLogin() {
    var errorCode = "success";
    const loginAction = () => {
      if (errorCode == "success") {
        //console.log("UID", firebase.auth().currentUser.uid);
        let curId = firebase.auth().currentUser.uid;
        console.log(curId);

        db.child(curId).once("value", function (snapshot) {
          snapshot.forEach(function (child) {
            console.log("role = ", child.val());
            if (child.val() == "Student") navigation.navigate("student");
            //WIP - need to fix sign in/database error
            else if (child.val() === "Recruiter") {
              console.log("recruiter signing in...");
              navigation.navigate("tabs");
            } else console.log("neither role found");
          });
        });
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
