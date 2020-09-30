import React from "react";
import { View, StyleSheet } from "react-native";
import {
  Avatar,
  Card,
  Surface,
  Title,
  Caption,
  useTheme,
} from "react-native-paper";
import data from "./LoadLocalData";

const CandidateCard = ({ id, studentDetailedView }) => {
  const student = data[id.item];
  const { colors } = useTheme();
  const avatar = (props) => (
    <Avatar.Icon
      {...props}
      icon="account-circle"
      backgroundColor={colors.accent}
    />
  );

  return (
    <Card style={styles.card} onPress={() => studentDetailedView(id.item)}>
      <Card.Title
        title={student.name}
        subtitle={student.qualifications.major}
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
