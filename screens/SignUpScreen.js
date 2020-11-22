import React, { useState } from "react";
import { Button, Image, Text, TextInput, View, StyleSheet } from "react-native";
import { Menu, useTheme } from "react-native-paper";
import { firebase } from "../firebase";

const db = firebase.database().ref("users");

const newStudent = {
  Preferences: { job: "", job_type: "", location: "" },
  name: "",
  profile_photo: "",
  qualifications: {
    Degree: "",
    Major: "",
    GPA: "",
    "Graduation Year": "",
    skills: [-1],
  },
  resume_link: "",
  university: "",
};

const SignUpScreen = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupError, setSignupError] = useState("");
  const [role, setRole] = useState("Select your role");

  const { colors } = useTheme();

  async function onSignUp() {
    setSignupError("");
    if (role == "Select your role") {
      setSignupError("Please select your role");
      return;
    }
    if (email == "") {
      setSignupError("Please provide an email address");
      return;
    }
    if (password != confirmPassword) {
      setSignupError("Password does not match");
      return;
    }
    var errorCode = "success";

    const signUpAction = (roleIn, email, userCredential, errorCode) => {
      if (errorCode != "success") return;
      const user = userCredential.user.uid;
      if (roleIn == "Recruiter") {
        // update the list of users
        db.update({
          [user]: {
            Folders: { Favorites: [-1] },
            role: roleIn,
            email: email,
          },
        });
        navigation.navigate("tabs");
      } else {
        //for students
        db.update({
          [user]: {
            role: roleIn,
            email: email,
          },
        });
        firebase
          .database()
          .ref("students")
          .update({
            [user]: newStudent,
          });
        navigation.navigate("student");
      }
    };
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        errorCode = err.code;
        setSignupError(err.message);
      })
      .then((userCredential) => {
        signUpAction(role, email, userCredential, errorCode);
      });
  }

  const selectRole = (
    <Text style={styles.roleSelect} onPress={() => setMenuVisible(true)}>
      {role}
    </Text>
  );
  const menu = (
    <Menu
      visible={menuVisible}
      onDismiss={() => setMenuVisible(false)}
      anchor={selectRole}
      contentStyle={{ backgroundColor: colors.background }}
    >
      <Menu.Item
        onPress={() => {
          setMenuVisible(false);
          setRole("Student");
        }}
        title="Student"
      />
      <Menu.Item
        onPress={() => {
          setMenuVisible(false);
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
  roleSelect: {
    backgroundColor: "white",
    padding: 5,
    borderBottomWidth: 2,
    width: 125,
  },
});

export default SignUpScreen;
