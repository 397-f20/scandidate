import CandidateCard from "../components/CandidateCard";
import FilterBar from "../components/FilterBar";
import ModalOptions from "../components/ModalOptions";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Portal, Provider, useTheme } from 'react-native-paper';

const RecruiterLandingScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState("Loading...");
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  const {colors} = useTheme();
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
