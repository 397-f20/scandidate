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
  const students = folder[1];
  const [data, setData] = useState({ students: {} });

  // database
  useEffect(() => {
    const db = firebase.database().ref("students");
    const handleData = (snap) => {
      if (snap.val()) {
        setData({ students: snap.val() });
      }
    };
    db.on("value", handleData, (error) => alert(error));
    return () => {
      db.off("value", handleData);
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

  const Header = () => {
    return (
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={title} />
        <Appbar.Action
          icon="hamburger"
          onPress={() => {
            navigation.navigate("MultiSelectScreen", folder)
          }}/>
      </Appbar.Header>
    );
  };

  return (
    <ScrollView style={{ backgroundColor: colors.background }}>
      <Header />
      <List />
    </ScrollView>
  );
};

export default FolderContents;
