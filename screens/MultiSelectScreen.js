import React, { useContext, useState, useEffect } from "react";
import StaticCandidateCard from "../components/StaticCandidateCard";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { firebase } from "../firebase";
import { Appbar, List, useTheme, Portal, Dialog, Button, Paragraph} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import DynamicFoldersModal from "../components/DynamicFoldersModal";
import NotesModal from "../components/NotesModal";
import Clipboard from '@react-native-community/clipboard';

const MultiSelectScreen = ({ route, navigation }) => {
  const [notesVisible, setNotesVisible] = useState(false);
  const [foldersVisible, setFoldersVisible] = useState(false);
  const hideNotes = () => setNotesVisible(false);
  const hideFolders = () => setFoldersVisible(false);

  const { colors } = useTheme();
  const folder = route.params.folder; //the curr folder and its content
  const folderName = folder[0];
  const data = route.params.data; //data of all students passed from folderContent Screen
  const [studentID, setStudentID] = useState(null);
  const [students, setStudents] = useState(folder[1]);
  const [selectionData, setSelectionData] = useState([]); //a list of candidate ids that's being selected
  const [deleteDiagVisible, setDeleteDiagVisible] = useState(false);
  const hideDeleteDialog = () => setDeleteDiagVisible(false);
  const [exportDiagVisible, setExportDiagVisible] = useState(false);
  const hideExportDiagVisible = () => setExportDiagVisible(false);
  const title = selectionData.length + " Selected";
  const [selectedContactInfo, setSelectedContactInfo] = useState("");

  let db_userFolder =
  firebase.auth() && firebase.auth().currentUser
    ? firebase
        .database()
        .ref("users/" + firebase.auth().currentUser.uid + "/Folders/" + folderName)
    : null;

  useEffect(() => {   
    db_userFolder =
    firebase.auth() && firebase.auth().currentUser
      ? firebase
          .database()
          .ref("users/" + firebase.auth().currentUser.uid + "/Folders/" + folderName)
      : null; 
    const handleData = (snapshot) => {
      if (snapshot.val()) {
        setStudents(snapshot.val());
      }
    }; //keep watching folder content changes
    db_userFolder.on("value", handleData, (error) => alert(error));
    return () => {
        db_userFolder.off("value", handleData);
    };
  }, []);

  let isSelectAll = false;
  const selectAllAction = () => {
    if (!isSelectAll) {
      //then we need to select all
      isSelectAll = true;
      let tmp_selectionData = students;
      let dummyIndex = tmp_selectionData.indexOf(-1); //exclude the dummy -1 in the selection
      if (dummyIndex !== -1) {
        tmp_selectionData.splice(dummyIndex, 1);
      }
      setSelectionData(tmp_selectionData);
    } else {
      //deselect All
      isSelectAll = false;
      setSelectionData([]);
    }
  };

  const deleteFromFolderAction = () => {
    setDeleteDiagVisible(false); //perform deletion from db
    let folderDataCopy = [...students]; //not filter on the original data directly
    //update db using {folderData - {folderData \intersect selectionData}} \union {-1}
    let difference = folderDataCopy.filter(x => !selectionData.includes(x));
    if(difference.length == 0){ difference = [-1];} //just in case...
    db_userFolder.set(difference).catch((error) => {
        alert(error.message);
    });
  }

  const getAllSelectedContactInfo = () =>{
    let resultString = "";
    for(let i in selectionData){
        resultString += data.students[selectionData[i]].name + ", "; //later could be emails
    }
    resultString = resultString.slice(0, -2)
    setExportDiagVisible(true);
    setSelectedContactInfo(resultString);
   }

  const copyToClipboard = () =>{
    // Clipboard.setString('hello world')
    //TODO
    console.log("set clipboard to selectedContactInfo");
  }

  const List = () => {
    return (
      <SafeAreaView>
        <Portal>
          <DynamicFoldersModal
            hideModal={hideFolders}
            modalVisible={foldersVisible}
            studentID={studentID}
            folderName={folderName}
            selectionData={selectionData}
          />
        </Portal>
        <Portal>
          <NotesModal
            hideModal={hideNotes}
            modalVisible={notesVisible}
            studentID={studentID}
          />
        </Portal>
        <FlatList
          data={students}
          keyExtractor={(index) => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={(item) => {
            if (data.students[item.item] == null) {
              return null;
            }
            return (
              <StaticCandidateCard
                studData={data.students[item.item]}
                id={item.item}
                setFoldersVisible={setFoldersVisible}
                setStudentID={setStudentID}
                setNotesVisible={setNotesVisible}
                selectionData={selectionData}
                setSelectionData={setSelectionData}
              />
            );
          }}
        />
      </SafeAreaView>
    );
  };


  const Header = () => {
    return (
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={title} />
        <Appbar.Content titleStyle={styles.selectAll}
          title= { selectionData.length == 0 ? "[Select All]" : "[Deselect All]"}
          onPress={() => {
            selectAllAction(); //selectALL
          }}
        />
      </Appbar.Header>
    );
  };

  return (
    <View style={{flex: 1}}>
        <View><Header /></View>
        <ScrollView style={{ backgroundColor: colors.background }}>
        <List />
        <Portal> 
            <Dialog visible={deleteDiagVisible} onDismiss={hideDeleteDialog}>
            <Dialog.Title>Delete Candidate from {folderName} Folder</Dialog.Title>
            <Dialog.Content>
  <Paragraph>Are you sure to delete the {selectionData.length} selected candidates from {folderName} folder?</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={hideDeleteDialog}>Cancel</Button>
                <Button onPress={() => {deleteFromFolderAction();}}>Delete</Button>
            </Dialog.Actions>
            </Dialog>
        </Portal>
        <Portal> 
            <Dialog visible={exportDiagVisible} onDismiss={hideExportDiagVisible}>
            <Dialog.Title>{selectionData.length} Candidate(s) Contact Info</Dialog.Title>
            <ScrollView>
                <Dialog.Content>
                    <Paragraph>{selectedContactInfo} </Paragraph>
                </Dialog.Content>
            </ScrollView>
            <Dialog.Actions style={styles.clipboardButton}>
                <Button onPress={() => {copyToClipboard();}} >Copy to Clickboard</Button>
            </Dialog.Actions>
            </Dialog>
        </Portal>
        </ScrollView>
        <View>
            <DynamicFooter 
                folderData={students} //all existing folder data
                selectionData={selectionData} 
                setFoldersVisible={setFoldersVisible} 
                setDeleteDiagVisible={setDeleteDiagVisible}
                getAllSelectedContactInfo={getAllSelectedContactInfo}
            />
        </View>
    </View>
  );
};

function DynamicFooter(props){
    if(props.selectionData.length != 0){ //there's at least some selection
        return (
            <Appbar style={styles.bottom}>
              <Appbar.Action
                icon="delete"
                onPress={() => props.setDeleteDiagVisible(true)}
              />
              <Appbar.Action
                icon="export"
                onPress={() => props.getAllSelectedContactInfo()}
              />
              <Appbar.Action
                icon="plus"
                onPress={() => props.setFoldersVisible(true)}
              />
            </Appbar>
          );
    }else{
        return (
            <Appbar style={styles.disabled}>
              <Appbar.Action
                icon="delete"
              />
              <Appbar.Action
                icon="export"
              />
              <Appbar.Action
                icon="plus"
              />
            </Appbar>
          );
    }
}
const styles = StyleSheet.create({
  clipboardButton:{
    //   padding:0,
    textAlign:"center"
  },
  selectAll:{
    fontSize:18,
    // borderBottomWidth:2,
    // borderBottomColor:"white",
    padding: 0,
    textAlign: "right"
  },
  disabled:{
    opacity:0.2
  },
  bottom: {
    // position:"absolute",
    // bottom:"30px",
  },
});

export default MultiSelectScreen;
