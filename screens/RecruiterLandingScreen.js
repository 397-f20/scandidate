import CandidateCard from "../components/CandidateCard";
import FilterBar from "../components/FilterBar";
import ModalOptions from "../components/ModalOptions";
import React, { useState } from "react";
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
  const [filterSettings, setFilterSettings] = useState({});
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  const { colors } = useTheme();

  console.log("recruiter", filterSettings);
  //add navigations to student's details
  const studentDetailedView = (studentInfo) => {
    navigation.navigate("StudentDetailScreen", { studentInfo });
  };

  console.log(data.students);
  const filteredStudents = Object.entries(data.students)
    .filter(([id, student]) => {
      let gpa = true;
      let grad = true;
      if (filterSettings["GPA"]) {
        gpa = student.qualifications.GPA >= parseFloat(filterSettings["GPA"]);
      }
      if (filterSettings["Graduation Year"]) {
        grad = filterSettings["Graduation Year"].includes(
          student.qualifications["Graduation Year"]
        );
      }
      return gpa && grad;
    })
    .map((s) => s[0]);

  console.log(filteredStudents);
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <FilterBar
        showModal={showModal}
        setModalData={setModalData}
        modalData={modalData}
      />
      {Object.keys(filterSettings).length == 0 ? null : (
        <Text>
          {filteredStudents.length} student(s) matched your qualifications.
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
          filteredStudents.length == 0
            ? Object.keys(data.students)
            : filteredStudents
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
