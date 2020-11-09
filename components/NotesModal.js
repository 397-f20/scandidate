import React, { useEffect, useState } from "react";
import { firebase } from "../firebase";
import { StyleSheet, View } from "react-native";
import { Modal, Text, Button, useTheme, TextInput } from "react-native-paper";

let db =
  firebase.auth() && firebase.auth().currentUser
    ? firebase
        .database()
        .ref("users/" + firebase.auth().currentUser.uid + "/Notes")
    : null;

const NotesModal = ({ hideModal, modalVisible, studentID }) => {
  const { colors } = useTheme();
  const [notesText, setNotesText] = useState("");

  // database
  useEffect(() => {
    db =
      firebase.auth() && firebase.auth().currentUser
        ? firebase
            .database()
            .ref("users/" + firebase.auth().currentUser.uid + "/Notes")
        : null;

    const handleData = (snapshot) => {
      if (snapshot.val()) {
      }
    };
    db.on("value", handleData, (error) => alert(error));
    return () => {
      db.off("value", handleData);
    };
  }, []);

  //add the folder name to the db
  const saveButton = () => {
    if (notesText != "") {
      //check if the note is empty

      //if not then updating note
      db.update({
        [parseInt(studentID)]: notesText,
      }).catch((error) => {
        alert(error.message);
      });
    }
  };

  return (
    <Modal visible={modalVisible}>
      <View style={[styles.modal, { backgroundColor: colors.surface }]}>
        <Text style={styles.title}>Add Note</Text>
        <TextInput
          label="Notes"
          value={notesText}
          onChangeText={(notesText) => setNotesText(notesText)}
          //style={styles.textIn}
        />

        <Button
          mode="contained"
          onPress={() => {
            hideModal();
            saveButton();
          }}
        >
          Save
        </Button>
        <Button
          mode="text"
          onPress={() => {
            hideModal();
          }}
        >
          Cancel
        </Button>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  checkbox: {
    flex: 1,
    alignSelf: "flex-end",
    justifyContent: "flex-end",
    right: 0,
  },
  modal: {
    margin: 20,
    flex: 1,
    borderRadius: 20,
    padding: 35,
  },
  singleSelect: {
    flex: 1,
    justifyContent: "flex-start",
  },
  title: {
    alignSelf: "center",
    fontSize: 20,
  },
  textIn: {
    height: 400,
    width: 400,
    margin: 20,
    flex: 1,
    alignContent: "center",
  },
});

export default NotesModal;
