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
  TextInput,
  TouchableOpacity,
} from "react-native";
import {
  Appbar,
  Checkbox,
  Modal,
  Menu,
  Button,
  useTheme,
  Portal,
  RadioButton,
} from "react-native-paper";
import Profile from "./profile";
import { set } from "react-native-reanimated";
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
  const [degreeVisible, setDegreeVisible] = useState(false);
  const [gpaVisible, setGpaVisible] = useState(false);
  const [gradVisible, setGradVisible] = useState(false);
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const { colors } = useTheme();

  const [GPA, setGPA] = useState("");

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
        <Appbar.Content
          title="My Profile"
          subtitle={editMode ? "Editing Profile" : null}
        />
        {editMode ? (
          <Appbar.Action
            icon="content-save"
            onPress={() => {
              const db =
                firebase.auth() && firebase.auth().currentUser
                  ? firebase
                      .database()
                      .ref("students/" + firebase.auth().currentUser.uid)
                  : null;
              setEditMode(false);
              db.update(student).catch((err) => {
                console.log(err.message);
              });
            }}
          />
        ) : (
          <Appbar.Action
            icon="lead-pencil"
            onPress={() => {
              setEditMode(true);
            }}
          />
        )}
      </Appbar.Header>
    );
  };

  const FieldSaved = () => {
    return (
      <View>
        <TouchableOpacity onPress={() => setVisible(true)}>
          <Field label="Degree" value={student.qualifications.Degree} />
        </TouchableOpacity>
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

  const selectDegree = student ? (
    <TouchableOpacity onPress={() => setDegreeVisible(true)}>
      <Text style={styles.label}>Degree</Text>
      <Text style={styles.roleSelect}>{student.qualifications.Degree}</Text>
    </TouchableOpacity>
  ) : null;

  const degreeMenu = (
    <Menu
      visible={degreeVisible}
      onDismiss={() => setDegreeVisible(false)}
      anchor={selectDegree}
      contentStyle={{ backgroundColor: colors.background }}
    >
      <Menu.Item
        onPress={() => {
          setDegreeVisible(false);
          setStudent({
            ...student,
            qualifications: { ...student.qualifications, Degree: "Bachelor's" },
          });
        }}
        title="Bachelor's"
      />
      <Menu.Item
        onPress={() => {
          setDegreeVisible(false);
          setStudent({
            ...student,
            qualifications: { ...student.qualifications, Degree: "Master's" },
          });
        }}
        title="Master's"
      />
      <Menu.Item
        onPress={() => {
          setDegreeVisible(false);
          setStudent({
            ...student,
            qualifications: { ...student.qualifications, Degree: "Doctorate" },
          });
        }}
        title="Doctorate"
      />
    </Menu>
  );

  const selectGradYear = student ? (
    <TouchableOpacity onPress={() => setGradVisible(true)}>
      <Text style={styles.label}>Graduation Year</Text>
      <Text style={styles.roleSelect}>
        {student.qualifications["Graduation Year"]}
      </Text>
    </TouchableOpacity>
  ) : null;

  const gradMenu = (
    <Menu
      visible={gradVisible}
      onDismiss={() => setGradVisible(false)}
      anchor={selectGradYear}
      contentStyle={{ backgroundColor: colors.background }}
    >
      <Menu.Item
        onPress={() => {
          setGradVisible(false);
          setStudent({
            ...student,
            qualifications: {
              ...student.qualifications,
              "Graduation Year": 2020,
            },
          });
        }}
        title="2020"
      />
      <Menu.Item
        onPress={() => {
          setGradVisible(false);
          setStudent({
            ...student,
            qualifications: {
              ...student.qualifications,
              "Graduation Year": 2021,
            },
          });
        }}
        title="2021"
      />
      <Menu.Item
        onPress={() => {
          setGradVisible(false);
          setStudent({
            ...student,
            qualifications: {
              ...student.qualifications,
              "Graduation Year": 2022,
            },
          });
        }}
        title="2022"
      />
      <Menu.Item
        onPress={() => {
          setGradVisible(false);
          setStudent({
            ...student,
            qualifications: {
              ...student.qualifications,
              "Graduation Year": 2023,
            },
          });
        }}
        title="2023"
      />
    </Menu>
  );

  const FieldEdit = () => {
    return (
      <View>
        <Text style={styles.label}>GPA</Text>
        <TextInput
          keyboardType="number-pad"
          // onEndEditing={(value) =>
          // setStudent({
          //   ...student,
          //   qualifications: { ...student.qualifications, GPA: value },
          // })
          // }
          onChangeText={(GPA) => {
            setGPA(GPA);
            setStudent({
              ...student,
              qualifications: {
                ...student.qualifications,
                GPA: GPA,
              },
            });
          }}
          placeholder={student.qualifications.GPA}
          value={GPA}
          maxLength={4}
          style={styles.roleSelect}
        />
        <Text style={styles.label}>Skills</Text>
        <TextInput
          //onChangeText ={(value)=> setStudent({...student, qualifications: {...qualifications, Skills:value}})}
          value={student.qualifications.skills.join(", ")}
          style={styles.roleSelect}
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
          {editMode ? (
            <View>
              {degreeMenu}
              {gradMenu}
              <FieldEdit />
            </View>
          ) : (
            <FieldSaved />
          )}
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
  roleSelect: {
    flex: 1,
    backgroundColor: "white",
    padding: 5,
    marginHorizontal: 10,
  },
});

export default StudentProfileScreen;
