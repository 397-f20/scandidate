import CandidateCard from "../components/CandidateCard";
import FilterBar from "../components/FilterBar";
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
import data from "../dummydata.json";

const RecruiterLandingScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState("Loading...");
  const initialSettings = {
    GPA: null,
    "Graduation Year": [],
  };
  const [filterSettings, setFilterSettings] = useState(initialSettings);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  const { colors } = useTheme();

  //add navigations to student's details
  const studentDetailedView = (studentInfo) => {
    navigation.navigate("StudentDetailScreen", { studentInfo });
  };

  const filterStudents = () => {
    let newScores = {};
    Object.entries(data.students).map(([id, student]) => {
      let score = 0;
      Object.entries(filterSettings).map(([title, reqs]) => {
        switch (title) {
          case "GPA": {
            if (reqs === null || student.qualifications.GPA >= parseFloat(reqs))
              score++;
            break;
          }
          case "Graduation Year":
          case "Major": {
            if (reqs.includes(student.qualifications[title])) score++;
            break;
          }
        }
      });

      newScores[id] = score;
    });

    return Object.entries(newScores)
      .filter(([id, score]) => score >= Object.keys(filterSettings).length)
      .map((s) => s[0]);
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
      <FlatList
        data={
          filterStudents().length == 0
            ? Object.keys(data.students)
            : filterStudents()
        }
        showsVerticalScrollIndicator={false}
        renderItem={(item) => (
          <CandidateCard id={item} studentDetailedView={studentDetailedView} />
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
