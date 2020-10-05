import React, { useContext, useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import { useTheme } from "react-native-paper";
import Profile from "./profile";

const Field = ({ label, value }) => {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.field}>{value}</Text>
    </View>
  );
};

const StudentDetailScreen = ({ route }) => {
  const student = route.params.studData;
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={StyleSheet.compose(styles.container, {
        backgroundColor: colors.background,
      })}
    >
      <ScrollView>
        <Profile student={student} />
        <Field label="Degree" value={student.qualifications.Degree} />
        <Field label="GPA" value={student.qualifications.GPA} />
        <Field
          label="Graduation Year"
          value={student.qualifications["Graduation Year"]}
        />
        <Field
          label="Skills"
          value={student.qualifications.skills.join(", ")}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  field: {
    height: 40,
    width: 400,
    padding: 5,
    backgroundColor: "white",
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontWeight: "bold",
  },
});

export default StudentDetailScreen;