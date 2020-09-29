import CandidateCard from "../components/CandidateCard";
import FilterBar from "../components/FilterBar";
import ModalOptions from "../components/ModalOptions";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Button } from "react-native";
import { Portal, Provider, useTheme } from 'react-native-paper';

const RecruiterLandingScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState("Loading...");
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  const {colors} = useTheme();

  //add navigations to student's details 
  const studentDetailedView = (studentInfo) => {
    navigation.navigate('StudentDetailScreen', { studentInfo }); //param should be an id or something
  };


  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.background}]}>
        <FilterBar
            showModal = {showModal}
            setModalData = {setModalData}
            modalData= {modalData}/>
          <Portal>
            <ModalOptions
                hideModal = {hideModal}
                modalVisible = {modalVisible}
                modalData = {modalData}/>
          </Portal>
        <ScrollView style={{ flex: 1 }}>
            <CandidateCard studentDetailedView={studentDetailedView}/>
            <CandidateCard />
            <CandidateCard />
            <CandidateCard />
            <CandidateCard />
            <CandidateCard />
            <CandidateCard />
            <CandidateCard />
            <CandidateCard />
            <CandidateCard />
            <CandidateCard />
            <CandidateCard />
        </ScrollView>
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
