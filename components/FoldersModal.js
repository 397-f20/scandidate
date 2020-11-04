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
} from "react-native-paper";

let db =
  firebase.auth() && firebase.auth().currentUser
    ? firebase
        .database()
        .ref("users/" + firebase.auth().currentUser.uid + "/Folders")
    : null;

const FoldersModal = ({ hideModal, modalVisible, studentID }) => {
  const { colors } = useTheme();
  const [checked, setChecked] = useState([]);
  const [folders, setFolders] = useState({});

  // database
  useEffect(() => {
    db =
      firebase.auth() && firebase.auth().currentUser
        ? firebase
            .database()
            .ref("users/" + firebase.auth().currentUser.uid + "/Folders")
        : null;

    const handleData = (snapshot) => {
      if (snapshot.val()) {
        setFolders(snapshot.val());
      }
    };
    db.on("value", handleData, (error) => alert(error));
    return () => {
      db.off("value", handleData);
    };
  }, []);

  const saveButton = () => {
    checked.map((folder) => {
      if (folders[folder].includes(parseInt(studentID))) {
        console.log(
          "This student has already been added to the " + folder + " folder"
        );
      } else {
        const newList = [...folders[folder], parseInt(studentID)];
        db.child(folder).set(newList);
      }
    });
    hideModal();
    setChecked([]);
  };

  const Folders = () => {
    return (
      <View style={styles.singleSelect}>
        <FlatList
          data={Object.keys(folders)}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <List.Icon size={24} icon="folder-outline" />
                <Text>{item}</Text>
              </View>
              <Checkbox.Android
                onPress={() => {
                  checked.includes(item)
                    ? setChecked(checked.filter((x) => x !== item))
                    : setChecked([...checked, item]);
                }}
                status={checked.includes(item) ? "checked" : "unchecked"}
                style={styles.checkbox}
              />
            </View>
          )}
        />
      </View>
    );
  };

  return (
    <Modal visible={modalVisible}>
      <View style={[styles.modal, { backgroundColor: colors.surface }]}>
        <Text style={styles.title}>My Folders</Text>
        <Folders />
        <Button mode="contained" onPress={() => saveButton()}>
          Save
        </Button>
        <Button
          mode="text"
          onPress={() => {
            hideModal();
            setChecked([]);
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
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  checkbox: {
    // flex: 1,
    // alignSelf: 'flex-end',
    // justifyContent: 'flex-end',
    right: 0,
    backgroundColor: "#fff",
  },
  modal: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
  },
  singleSelect: {
    // flex: 1,
    justifyContent: "flex-start",
    flexDirection: "column",
  },
  title: {
    alignSelf: "center",
    fontSize: 20,
  },
});

export default FoldersModal;
