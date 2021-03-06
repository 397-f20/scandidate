import React, { useContext, useState, useEffect } from "react";
import CandidateCard from "../components/CandidateCard";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { firebase } from "../firebase";
import { Appbar, List, useTheme, Portal } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import FoldersModal from "../components/FoldersModal";
import NotesModal from "../components/NotesModal";

const FolderContents = ({ route, navigation }) => {
  const [notesVisible, setNotesVisible] = useState(false);
  const [foldersVisible, setFoldersVisible] = useState(false);
  const hideNotes = () => setNotesVisible(false);
  const hideFolders = () => setFoldersVisible(false);

  const [studentID, setStudentID] = useState(null);
  const { colors } = useTheme();
  const folder = route.params.folder;
  const title = folder[0];
  const [students, setStudents] = useState(folder[1]); //keep updating
  const [data, setData] = useState({ students: {} });

  let db_userFolder =
    firebase.auth() && firebase.auth().currentUser
      ? firebase
          .database()
          .ref("users/" + firebase.auth().currentUser.uid + "/Folders/" + title)
      : null;

  // database
  useEffect(() => {
    const db = firebase.database().ref("students");
    const handleData = (snap) => {
      if (snap.val()) {
        setData({ students: snap.val() });
      }
    };
    db.on("value", handleData, (error) => alert(error));

    db_userFolder =
      firebase.auth() && firebase.auth().currentUser
        ? firebase
            .database()
            .ref(
              "users/" + firebase.auth().currentUser.uid + "/Folders/" + title
            )
        : null;
    const handleFolderData = (snapshot) => {
      if (snapshot.val()) {
        setStudents(snapshot.val());
      }
    }; //keep watching folder content changes
    db_userFolder.on("value", handleFolderData, (error) => alert(error));
    return () => {
      db.off("value", handleData);
      db_userFolder.off("value", handleFolderData);
    };
  }, []);

  const List = () => {
    return (
      <SafeAreaView>
        <Portal>
          <FoldersModal
            hideModal={hideFolders}
            modalVisible={foldersVisible}
            studentID={studentID}
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
              <CandidateCard
                studData={data.students[item.item]}
                id={item.item}
                navigation={navigation}
                setFoldersVisible={setFoldersVisible}
                setStudentID={setStudentID}
                //filterSettings={filterSettings}
                setNotesVisible={setNotesVisible}
              />
            );
          }}
        />
      </SafeAreaView>
    );
  };
  const folder_data = { folder, data }; //packed and passed to multiSelectScreen
  const Header = () => {
    return (
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={title} />
        <Appbar.Action
          icon="hamburger"
          onPress={() => {
            navigation.navigate("MultiSelectScreen", folder_data);
          }}
        />
      </Appbar.Header>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View>
        <Header />
      </View>
      <ScrollView style={{ backgroundColor: colors.background }}>
        <List />
      </ScrollView>
    </View>
  );
};

export default FolderContents;
