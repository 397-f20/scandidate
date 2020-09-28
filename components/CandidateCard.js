import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Avatar, Card, Surface, useTheme } from "react-native-paper";

const CandidateCard = () => {
  const name = "my name";
  const major = "my major";
  const {colors} = useTheme();
  return (
    <Card style = {styles.card}>
      <Avatar.Icon size={24} icon="account-circle" backgroundColor = {colors.accent}/>
      <Text>{name}</Text>
      <Text>{major}</Text>
    </Card>
  );
};


const styles = StyleSheet.create({
  card: {
    marginVertical: 5,
    padding: 10,
    width: "100%",
  },
});


export default CandidateCard;
