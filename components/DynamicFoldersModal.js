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
  Portal, Dialog,  Paragraph
} from "react-native-paper";

let db =
  firebase.auth() && firebase.auth().currentUser
    ? firebase
        .database()
        .ref("users/" + firebase.auth().currentUser.uid + "/Folders")
    : null;

const DynamicFoldersModal = ({ hideModal, modalVisible, studentID, folderName, selectionData }) => {
  const { colors } = useTheme();
  const [checked, setChecked] = useState([]);
  const [folders, setFolders] = useState({}); //all folder options
  const [currFolder, setCurrFolder] = useState(folderName); //currFolder passed from the folder content page
  const [studentList, setStudentList] = useState(selectionData); //currFolder passed from the folder content page
  const [sameFolderDiagVisible, setSameFolderDiagVisible] = useState(false);
  const hideSameFolderDiagVisible = () => setSameFolderDiagVisible(false);
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
    for(let i in checked){
        let prevData = folders[checked[i]]; //get the existing contents in a folder
        //get the union of previous folder content data and the new studentList waited to be added in
        let union = [...new Set([...prevData, ...studentList])];
        db.child(checked[i]).set(union).catch((error) => {
            alert(error.message);
        });
    }
    hideModal();
    setChecked([]);
  };


  const setCheckAction = (same, item) => { //what would happen if checkbox is clicked
    setSameFolderDiagVisible(same);
    if(same){
        return; //cannot be checked or added
    }else{ //prevent leaks...
        checked.includes(item)
        ? setChecked(checked.filter((x) => x !== item))
        : setChecked([...checked, item]);
    }
  }


  const Folders = () => {
    return (
      <View style={styles.singleSelect}>
        <FlatList
          data={Object.keys(folders)}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            < DynamicFolderOptions 
            item={item} 
            checked={checked} 
            setChecked={setChecked} 
            currFolder={currFolder}
            setSameFolderDiagVisible={setSameFolderDiagVisible}
            setCheckAction={setCheckAction}
            />
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
        <Portal>
            <Dialog style={styles.dialog} visible={sameFolderDiagVisible} onDismiss={hideSameFolderDiagVisible}>
            <Dialog.Title>Already Existing</Dialog.Title>
            <Dialog.Content>
                <Paragraph>The {studentList.length} selected candidate(s) are already existing in this folder </Paragraph>
            </Dialog.Content>
            </Dialog>
        </Portal>
        <Button mode="contained" onPress={() => saveButton()}>
          Add to Folder(s)
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

function DynamicFolderOptions(props){
    let item = props.item;
    let checked = props.checked;
    let setChecked = props.setChecked;
    let itemStyle = styles.enabled;
    let isSame = false;
    if(item == props.currFolder){ //handle the special display when the destination folder selected is the same as source
        itemStyle = styles.disabled;
        isSame = true;
    }
    return (
        <View style={itemStyle}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <List.Icon size={24} icon="folder-outline" />
          <Text>{item}</Text>
        </View>
        <Checkbox.Android
          onPress={() => {
            props.setCheckAction(isSame, item);
          }}
          status={(checked.includes(item) & !isSame) ? "checked" : "unchecked"}
          style={styles.checkbox}
        />
      </View>
      );
}
const styles = StyleSheet.create({
  dialog:{
    opacity:0.9
  },
  disabled:{
    opacity:0.4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  enabled:{
      opacity:1.0,
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

export default DynamicFoldersModal;
