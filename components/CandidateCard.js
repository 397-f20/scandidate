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
//import data from "./LoadLocalData";
import { firebase } from "../firebase";


const fixStudents = json => ({
  ...json,
  students: Object.values(json.students)
});



const CandidateCard = ({ id, studentDetailedView }) => {
  const [data, setData] = useState({ students : []});
  
  const { colors } = useTheme();

  console.log(id)
  
  

  // database
  useEffect(() => {
    const db = firebase.database().ref();
    const handleData = snap => {
      if (snap.val()) {
        setData(fixStudents(snap.val()));
        console.log(data.students);
      } 
    }
    db.on('value', handleData, error => alert(error));
    console.log(data);
    return () => { db.off('value', handleData); };
    
  }, []);

  const studentList = data.students;
  const student = studentList[id.item];

  


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
        subtitle={student.qualifications.Major}
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
