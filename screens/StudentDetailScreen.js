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
import students from "../components/LoadLocalData";
import Profile from "./profile";

const Field = ({ label, value }) => {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.field}>{value}</Text>
    </View>
  );
};

const dum = {
  Preferences: {
    job: "Product Manager",
    job_type: "full time",
    location: "Chicago",
  },
  name: "Benjamin Powell",
  profile_photo:
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.charactour.com%2Fhub%2Fcharacters%2Fview%2FHiccup-Haddock-III.How-to-Train-Your-Dragon&psig=AOvVaw1SEbPHZvvQguGRBf24lK3V&ust=1601319309289000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMCzoreBiuwCFQAAAAAdAAAAABAD",
  qualifications: {
    GPA: 3.8,
    gradYear: 2020,
    degree: "master",
    major: "Computer Engineering",
    skills: ["communication", "java"],
  },
  resume_link:
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.charactour.com%2Fhub%2Fcharacters%2Fview%2FHiccup-Haddock-III.How-to-Train-Your-Dragon&psig=AOvVaw1SEbPHZvvQguGRBf24lK3V&ust=1601319309289000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMCzoreBiuwCFQAAAAAdAAAAABAD",
  university: "Northwestern University",
};

const StudentDetailScreen = ({ route }) => {
  const studentInfo = route.params.studentInfo;
  const student = students[studentInfo];
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
