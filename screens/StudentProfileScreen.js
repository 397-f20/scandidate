// Student Profile Screen is on the student user end
// Students may edit their own profiles
import React, { useContext, useState, useEffect } from "react";
import { firebase } from "../firebase";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import { useTheme, Button, Portal } from "react-native-paper";
import Profile from "./profile";
const Field = ({ label, value }) => {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.field}>{value}</Text>
    </View>
  );
};

const StudentProfileScreen = () => {
  const [student, setStudent] = useState();
  const { colors } = useTheme();

  useEffect(() => {
    const db =
      firebase.auth() && firebase.auth().currentUser
        ? firebase.database().ref("students/srUHsWjQuAQyGphnOmoStO8vhDp1")
        : null;

    const handleData = (snapshot) => {
      if (snapshot.val()) {
        setStudent(snapshot.val());
        console.log("Student data = ", student);
      }
    };
    db.on("value", handleData, (error) => alert(error));
    return () => {
      db.off("value", handleData);
    };
  }, []);

  return (
    <SafeAreaView
      style={StyleSheet.compose(styles.container, {
        backgroundColor: colors.background,
      })}
    >
      <ScrollView></ScrollView>
    </SafeAreaView>
  );
};

/*
<Profile student={student} />
        <Field label="Degree" value={student.qualifications.Degree} />
        <Field label="GPA" value={student.qualifications.GPA} />
        <Field
          label="Graduation Year"
          value={student.qualifications["Graduation Year"]}
        />
        <Field
          label="Skills"
          value={student.qualifications.skills.join(", ")}
        />
        <Field label="Notes" value={notesMsg} />
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between", //"center",
  },
  field: {
    flex: 1,
    marginHorizontal: 10,
    padding: 5,
    backgroundColor: "white",
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    marginHorizontal: 10,
    fontWeight: "bold",
  },
  button: {
    width: 200,
    height: 40,
  },
});

export default StudentProfileScreen;
