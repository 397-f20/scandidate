import React, { useContext, useState, useEffect } from "react";
import StaticCandidateCard from "../components/StaticCandidateCard";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { firebase } from "../firebase";
import { Appbar, List, useTheme, Portal } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import FoldersModal from "../components/FoldersModal";
import NotesModal from "../components/NotesModal";
import MultiSelect from "react-multi-select-component";

const MultiSelectScreen = ({ route, navigation }) => {
  const [notesVisible, setNotesVisible] = useState(false);
  const [foldersVisible, setFoldersVisible] = useState(false);
  const [multiSelectVisible, setMultiSelectVisible] = useState(false);
  const hideNotes = () => setNotesVisible(false);
  const hideFolders = () => setFoldersVisible(false);
  const hideMultiSelect = () => setMultiSelectVisible(false);
  
  const [studentID, setStudentID] = useState(null);
  const { colors } = useTheme();
  const folder = route.params;
  const title = "Multi-select Actions";
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
              <StaticCandidateCard
                studData={data.students[item.item]}
                id={item.item}
                setFoldersVisible={setFoldersVisible}
                setStudentID={setStudentID}
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
          icon="box"
          onPress={() => {
            setMultiSelectVisible(true); //selectALL
          }}/>
        <Appbar.Action
          icon="check"
          onPress={() => {
            setMultiSelectVisible(true);
          }}/>
      </Appbar.Header>
    );
  };

  const Footer = () => {
    return (
      <Appbar style={styles.bottom}>
            <Appbar.Action
            icon="delete"
            onPress={() => console.log('Pressed delete')}
            />
            <Appbar.Action icon="plus" onPress={() => console.log('add to another folder')} />

      </Appbar>
    );
  };

  return (
    <ScrollView style={{ backgroundColor: colors.background }}>
      <Header />
      <List />
      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    bottom: {
        // position: 'absolute',
        // left: 0,
        // right: 0,
        // bottom: 0,
      },
  });

  
export default MultiSelectScreen;
