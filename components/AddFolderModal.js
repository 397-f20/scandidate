import React, { useEffect, useState } from "react";
import {firebase} from '../firebase';
import { Alert, StyleSheet, View, FlatList } from "react-native";
import { Checkbox, List, Modal, Text, Button, useTheme,TextInput } from "react-native-paper";

const db = firebase.database().ref('companies/Google/recruiters/Jen B/Folders');


const AddFolderModal = ({folders, modalVisible, setModalVisible }) => {
  const { colors } = useTheme();
  const [folderName, setFolderName] = React.useState('');
  const [submitError, setSubmitError] = useState('');
  // database
  useEffect(() => {
    const handleData = (snapshot) => {
      if (snapshot.val()){}
    }
    db.on("value", handleData, (error) => alert(error));
    return () => {
      db.off("value", handleData);
    };
  }, []);

  //add the folder name to the db
  const saveButton = () => {
    if(folderName != ""){
        //check if the folder name already exists in db
        if (Object.keys(folders).includes(folderName)){
            alert("Already Existing! ");
            setFolderName("");
        }
        else{//if not then add to the folder
            const newfolderObj = {
                ...folders,
                [folderName]: [-1],
            };
            db.set(newfolderObj).catch(error => {
                    alert(error.message);
            });

            setModalVisible(false);
        }
    }
  };


  return (
    <Modal visible={modalVisible}>
      <View style={[styles.modal, { backgroundColor: colors.surface }]}>
        <Text style={styles.title}>Create a New Folder</Text>
        <TextInput
            label="Folder Name"
            value={folderName}
            onChangeText={folderName => setFolderName(folderName)}
        />
        <Button mode="contained" onPress={() => saveButton()}>
          Save
        </Button>
        <Button mode="text" onPress={() => {
            setModalVisible(false);
          }}>
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
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
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

export default AddFolderModal;
