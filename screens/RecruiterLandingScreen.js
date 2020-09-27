import CandidateCard from "../components/CandidateCard";
import FilterBar from "../components/FilterBar";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

const RecruiterLandingScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FilterBar />
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
