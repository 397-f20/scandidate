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
import { Appbar, useTheme, Button, Portal } from "react-native-paper";
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
  const [student, setStudent] = useState(null);
  const { colors } = useTheme();

  useEffect(() => {
    const db =
      firebase.auth() && firebase.auth().currentUser
        ? firebase.database().ref("students/" + firebase.auth().currentUser.uid)
        : null;

    const handleData = (snapshot) => {
      if (snapshot.val()) {
        setStudent(snapshot.val());
      }
    };
    db.on("value", handleData, (error) => alert(error));
    return () => {
      db.off("value", handleData);
    };
  }, []);


  const Header = () => {
    return (
      <Appbar.Header>
        <Appbar.Content title="My Profile" />
        <Appbar.Action
          icon="plus"
          onPress={() => {
            setEditModalVisible(true);
          }}
        />
      </Appbar.Header>
    );
  };

  const FieldSaved = () => {
    return (
      <View>
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
      </View>
    );
  };


  return (
    <SafeAreaView
      style={StyleSheet.compose(styles.container, {
        backgroundColor: colors.background,
      })}
    >
      {student ? (
        <ScrollView style={styles.scroll}>
          <Header />
          <Profile student={student} />
          <FieldSaved />
        </ScrollView>
      ) : null}
    </SafeAreaView>
  );
};

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
  scroll: {
    flex: 1,
    width: "100%",
  },
});

export default StudentProfileScreen;
