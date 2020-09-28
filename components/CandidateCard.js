import React from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, Card, Surface, Title, Caption, useTheme } from "react-native-paper";

const CandidateCard = () => {
  const {colors} = useTheme();
  const name = "Amber Rebma";
  const major = "Piano Performance";
  const avatar = props => <Avatar.Icon {...props} icon="account-circle"
      backgroundColor = {colors.accent}
  />

  return (
    <Card style = {styles.card}>
      <Card.Title
        title={name}
        subtitle={major}
        left={avatar}
        />
    </Card>
  );
};


const styles = StyleSheet.create({
  card: {
    margin: 5,
  },
});


export default CandidateCard;
