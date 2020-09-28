import CandidateCard from "../components/CandidateCard";
import FilterBar from "../components/FilterBar";
import ModalOptions from "../components/ModalOptions";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Portal, Provider } from 'react-native-paper';

const RecruiterLandingScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  return (
    <SafeAreaView style={styles.container}>
        <FilterBar showModal = {showModal}/>
          <Portal>
            <ModalOptions hideModal = {hideModal} modalVisible = {modalVisible}/>
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
    alignItems: "flex-start",
    flex: 1,
    justifyContent: "center",
  },
});

export default RecruiterLandingScreen;
