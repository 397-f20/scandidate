import React, { useContext, useState, useEffect } from "react";
import CandidateCard from "../components/CandidateCard";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { firebase } from "../firebase";
import { Appbar, List, useTheme } from "react-native-paper";

const FolderContents = ({ route, navigation }) => {
  const folder = route.params.folder;
  const title = folder[0];
  const students = folder[1];
  const [data, setData] = useState({ students: {} });

  // database
  useEffect(() => {
    const db = firebase.database().ref("students");
    const handleData = (snap) => {
      if (snap.val()) {
        setData({ students: snap.val() });
      }
    };
    db.on("value", handleData, (error) => alert(error));
    return () => {
      db.off("value", handleData);
    };
  }, []);

  const List = () => {
    return (
      <FlatList
        data={students}
        keyExtractor={(index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={(item) => {
          if (data.students[item.item] == null) {
            return null;
          }
          return (
            <CandidateCard
              studData={data.students[item.item]}
              id={item.item}
              navigation={navigation}
            />
          );
        }}
      />
    );
  };

  return <List />;
};

export default FolderContents;
