import React from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, Card, Surface, Title, Caption, useTheme } from "react-native-paper";

const CandidateCard = () => {
  const name = "Amber Rebma";
  const major = "Piano Performance";
  const {colors} = useTheme();
  return (
    <Card style = {styles.card}>
      <Avatar.Icon size={24} icon="account-circle" backgroundColor = {colors.accent}/>
      <Title>{name}</Title>
      <Caption>{major}</Caption>
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
