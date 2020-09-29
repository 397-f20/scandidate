import React, {useContext, useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

//retrive student's details 
import LoadLocalData from "../components/LoadLocalData";
console.log(LoadLocalData.getStudent);

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
        <Field label="Name" value={studentInfo} />
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