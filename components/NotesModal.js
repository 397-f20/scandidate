import React, { useEffect } from "react";
import { firebase } from "../firebase";
import { StyleSheet, View } from "react-native";
import { Modal, Text, Button, useTheme, TextInput } from "react-native-paper";

let db =
  firebase.auth() && firebase.auth().currentUser
    ? firebase
        .database()
        .ref("users/" + firebase.auth().currentUser.uid + "/Notes")
    : null;

const NotesModal = ({ notes, modalVisible, setModalVisible, studentID }) => {
  const { colors } = useTheme();
  const [notesText, setNotesText] = React.useState("");

  // database
  useEffect(() => {
    db =
      firebase.auth() && firebase.auth().currentUser
        ? firebase
            .database()
            .ref("users/" + firebase.auth().currentUser.uid + "/Notes")
        : null;

    const handleData = snapshot => {
      if (snapshot.val()) {
      }
    };
    db.on("value", handleData, error => alert(error));
    return () => {
      db.off("value", handleData);
    };
  }, []);

  //add the folder name to the db
  const saveButton = () => {
    if (notesText != "") {
      //check if the folder name already exists in db

      //if not then changing the folder name
      console.log(studentID);
      db.update({
        [studentID]: [notesText]
      }).catch(error => {
        alert(error.message);
      });

      // const prevContent = folders[selectedFolder];
      // const newfolderObj = {
      //   ...folders,
      //   [newFolderName]: prevContent
      // };
      // // adding it
      // db.set(newfolderObj).catch(error => {
      //   alert(error.message);
      // });
      // //removing the previous folder
      // db.child(selectedFolder)
      //   .remove()
      //   .catch(error => {
      //     alert(error.message);
      //   });
      // setNewFolderName("");
      // setEditFolderVisible(false);
    }
  };

  return (
    <Modal visible={modalVisible}>
      <View style={[styles.modal, { backgroundColor: colors.surface }]}>
        <Text style={styles.title}>Create a New Folder</Text>
        <TextInput
          label="Notes"
          value={notesText}
          onChangeText={notesText => setNotesText(notesText)}
        />
        <Button mode="contained" onPress={() => saveButton()}>
          Save
        </Button>
        <Button
          mode="text"
          onPress={() => {
            setModalVisible(false);
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
    justifyContent: "space-between"
  },
  checkbox: {
    flex: 1,
    alignSelf: "flex-end",
    justifyContent: "flex-end",
    right: 0
  },
  modal: {
    margin: 20,
    borderRadius: 20,
    padding: 35
  },
  singleSelect: {
    flex: 1,
    justifyContent: "flex-start"
  },
  title: {
    alignSelf: "center",
    fontSize: 20
  }
});

export default NotesModal;
