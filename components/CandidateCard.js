import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import {
  Avatar,
  Card,
  Surface,
  Title,
  Caption,
  useTheme,
} from "react-native-paper";

const CandidateCard = ({ studData, index, navigation }) => {
  const { colors } = useTheme();
  const avatar = (props) => (
    <Avatar.Icon
      {...props}
      icon="account-circle"
      backgroundColor={colors.accent}
    />
  );

  return (
    <Card
      style={styles.card}
      onPress={() => navigation.navigate("StudentDetailScreen", { studData })}
    >
      <Card.Title
        title={studData.name}
        subtitle={studData.qualifications.Major}
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
