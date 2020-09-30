import React from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, Card, Surface, Title, Caption, useTheme } from "react-native-paper";

//load local .json dummy data and fetch the candidate infos
import * as localData from '../dummydata.json';

const students = localData.students;

//basic info to be displayed:
//name, profile_photo,  + info to be filtered
//info to be filtered:
//qualifications: gpa, degree, major, skills
const LoadLocalData = () => {
    // return students; //did nothing
    // console.log(students[100].name)
};

  
export default students;