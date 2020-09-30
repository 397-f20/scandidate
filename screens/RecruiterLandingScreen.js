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

  //add navigations to student's details
  const studentDetailedView = (studentInfo) => {
    navigation.navigate("StudentDetailScreen", { studentInfo });
  };

  const filteredStudents = Object.entries(data.students)
    .filter(
      ([id, student]) =>
        student.qualifications.GPA >= parseFloat(filterSettings["GPA"])
    )
    .map((s) => s[0]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <FilterBar
        showModal={showModal}
        setModalData={setModalData}
        modalData={modalData}
      />
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
        data={filteredStudents}
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
