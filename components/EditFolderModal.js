import React, { useEffect, useState } from "react";
import { firebase } from "../firebase";
import { Alert, StyleSheet, View, FlatList } from "react-native";
import {
  Checkbox,
  List,
  Modal,
  Text,
  Button,
  useTheme,
  TextInput,
} from "react-native-paper";

const db = firebase.database().ref("companies/Google/recruiters/Jen B/Folders");

const EditFolderModal = ({ 
    setEditFolderVisible, 
    editFolderVisible, 
    selectedFolder,
    folders }) => {
  const { colors } = useTheme();

  const [submitError, setSubmitError] = useState("");
  const [newFolderName, setNewFolderName] = React.useState(selectedFolder);
  // database
  useEffect(() => {
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
    if (selectedFolder != "") {
        //check if the folder name already exists in db
        if (selectedFolder == newFolderName) {
            alert("Please Enter a Different Name! ");
        } else {
        //if not then changing the folder name
        const prevContent = folders[selectedFolder];
        const newfolderObj = {
            ...folders,
            [newFolderName]: prevContent,
        };
        // adding it
        db.set(newfolderObj).catch((error) => {
          alert(error.message);
        });
        //removing the previous folder
        db.child(selectedFolder).remove().catch(error => { alert(error.message); });
        setNewFolderName("");
        setEditFolderVisible(false);    
      }
    }
  };

  return (
    <Modal visible={editFolderVisible}>
      <View style={[styles.modal, { backgroundColor: colors.surface }]}>
        <Text style={styles.title}>Edit Folder Name</Text>
        <TextInput
          label="New Folder Name"
          value={newFolderName}
          onChangeText={(newFolderName) => setNewFolderName(newFolderName)}
        />
        <Button mode="contained" onPress={() => saveButton()}>
          Rename
        </Button>
        <Button
          mode="text"
          onPress={() => {
            setEditFolderVisible(false);
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
});

export default EditFolderModal;
