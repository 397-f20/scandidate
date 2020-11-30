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
import FoldersModal from "../components/FoldersModal";
import NotesModal from "../components/NotesModal";

const Field = ({ label, value }) => {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.field}>{value}</Text>
    </View>
  );
};

const StudentDetailScreen = ({ route }) => {
  const [foldersVisible, setFoldersVisible] = useState(false);
  const [notesVisible, setNotesVisible] = useState(false);
  const [notesList, setNotesList] = useState([]);
  const hideFolders = () => setFoldersVisible(false);
  const openFolders = () => setFoldersVisible(true);
  const hideNotes = () => setNotesVisible(false);
  const showNotes = () => setNotesVisible(true);

  const student = route.params.studData;
  const id = route.params.id;

  const { colors } = useTheme();

  // database to retrieve notes
  useEffect(() => {
    const db =
      firebase.auth() && firebase.auth().currentUser
        ? firebase
            .database()
            .ref("users/" + firebase.auth().currentUser.uid + "/Notes")
        : null;

    const handleData = (snapshot) => {
      if (snapshot.val()) {
        setNotesList(snapshot.val());
      }
    };
    db.on("value", handleData, (error) => alert(error));
    return () => {
      db.off("value", handleData);
    };
  }, []);

  const notesMsg = id in notesList ? notesList[id] : "None";

  return (
    <SafeAreaView
      style={StyleSheet.compose(styles.container, {
        backgroundColor: colors.background,
      })}
    >
      <Button
        icon="plus"
        onPress={openFolders}
        //mode="contained"
        style={styles.button}
      >
        Add to Folder
      </Button>
      <ScrollView style={styles.scroll}>
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
        <View style={styles.container}>
        <Button
          icon="plus"
          onPress={showNotes}
          //mode="contained"
          style={styles.button}
        >
          Add a Note
        </Button>
        </View>
      </ScrollView>

      <Portal>
        <FoldersModal
          hideModal={hideFolders}
          modalVisible={foldersVisible}
          studentID={id}
        />
        <NotesModal
          hideModal={hideNotes}
          modalVisible={notesVisible}
          studentID={id}
        />
      </Portal>
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
    flex: 1,
    marginBottom: 20,
  },
  label: {
    marginHorizontal: 10,
    flex: 1,
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

export default StudentDetailScreen;
