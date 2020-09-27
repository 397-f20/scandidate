import React from "react";
import { View, StyleSheet, Text } from "react-native";

const CandidateCard = () => {
  const name = "my name";
  const major = "my major";
  return (
    <View style={styles.card}>
      <Text>{name}</Text>
      <Text>{major}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    marginVertical: 5,
    padding: 10,
    width: "100%",
  },
});

export default CandidateCard;
