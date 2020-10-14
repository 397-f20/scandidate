import CandidateCard from "../components/CandidateCard";
import FilterBar from "../components/FilterBar";
import FoldersModal from "../components/FoldersModal";
import ModalOptions from "../components/ModalOptions";
import React, { useState, useEffect } from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
} from "react-native";
import { Portal, Provider, useTheme } from "react-native-paper";
import { firebase } from "../firebase";

const RecruiterLandingScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState("Loading...");
  const [foldersVisible, setFoldersVisible] = useState(false);
  const [studentID, setStudentID] = useState(null);

  const initialSettings = {
    GPA: null,
    "Graduation Year": [],
    Major: [],
    Degree: [],
  };
  const [data, setData] = useState({ students: [] });
  const [filterSettings, setFilterSettings] = useState(initialSettings);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  const hideFolders = () => setFoldersVisible(false);
  const { colors } = useTheme();


  // database
  useEffect(() => {
    const db = firebase.database().ref("students");
    const handleData = (snap) => {
      if (snap.val()) {
        setData({students: snap.val()});
      }
    };
    db.on("value", handleData, (error) => alert(error));
    return () => {
      db.off("value", handleData);
    };
  }, []);

  const filterStudents = () => {
    let newScores = {};
    let matches = 0;
    Object.entries(data.students).map(([id, student]) => {
      let score = 0;
      Object.entries(filterSettings).map(([title, reqs]) => {
        switch (title) {
          case "GPA": {
            if (reqs === null || student.qualifications.GPA >= parseFloat(reqs))
              score++;
            break;
          }
          case "Degree":
          case "Graduation Year":
          case "Major": {
            if (
              reqs.length === 0 ||
              reqs.includes(student.qualifications[title])
            )
              score++;
            break;
          }
        }
      });
      if (score >= Object.keys(filterSettings).length){
        matches++;
      }
      newScores[id] = score;
    });

    if (Object.entries(filterSettings)[1].length === 0){
      matches = Object.entries(data.students).length;
    }
    console.log('number of exact matches = ', matches);
    let filtered = Object.entries(newScores);
    filtered = filtered.sort(sorter).reverse();

    function sorter(a, b) {
      if(a[1]==b[1]){
        return 0;
      }
      else{
        return (a[1] < b[1]) ? -1 : 1;
      }
    }

    return filtered.map((s) => s[0]);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <FilterBar
        showModal={showModal}
        setModalData={setModalData}
        modalData={modalData}
      />
      {filterSettings === initialSettings ? null : (
        <Text>
          {filterStudents().length} student(s) matched your qualifications.
        </Text>
      )}
      <Portal>
        <ModalOptions
          filterSettings={filterSettings}
          hideModal={hideModal}
          modalVisible={modalVisible}
          modalData={modalData}
          setFilterSettings={setFilterSettings}
        />
      </Portal>
      <Portal>
        <FoldersModal hideModal={hideFolders} modalVisible={foldersVisible} studentID={studentID}/>
      </Portal>
      <FlatList
        data={
          filterStudents().length == 0
            ? Object.keys(data.students)
            : filterStudents()
        }
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={(item) => (
          <CandidateCard
            studData={data.students[item.item]}
            id={item.item}
            navigation={navigation}
            setFoldersVisible={setFoldersVisible}
            setStudentID={setStudentID}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    flex: 1,
    justifyContent: "center",
  },
});

export default RecruiterLandingScreen;
