import React, {useContext, useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Image } from 'react-native';

//retrive student's details 
//load local .json dummy data and fetch the candidate infos
// import * as localData from '../dummydata.json';
// const students = localData.students;
import students  from "../components/LoadLocalData";
// const students = LoadLocalData.students;

const Field = ({label, value}) => {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.field}>{value}</Text>
    </View>
  );
};

const StudentDetailScreen = ({route}) => {
  const studentInfo = route.params.studentInfo;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Field label="ID" value={studentInfo} />
        <Field label="Name" value={students[studentInfo].name} />
        <Field label="Resume Link" value={students[studentInfo].resume_link} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccccb3'
  },
  field: {
    height: 40,
    width: 300,
    padding: 5,
    backgroundColor: 'white',
  },
  fieldContainer: {
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  label: {
    fontWeight: 'bold',
  }
});

export default StudentDetailScreen;