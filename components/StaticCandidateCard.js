import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import {
  Avatar,
  Card,
  IconButton,
  Menu,
  Surface,
  Title,
  Caption,
  useTheme,
  Checkbox,
} from "react-native-paper";


const StaticCandidateCard = ({
  studData,
  id,
  setFoldersVisible,
  setStudentID,
  filterSettings,
  setNotesVisible,
}) => {
  const { colors } = useTheme();
  const [isSelected, setIsSelected] = useState(false);

  const icon1 = (props) => {
    return <IconButton icon="arrow-collapse-vertical" />;
  };


  const avatar = props => { 
      return <Checkbox.Android status={isSelected ? "checked" : "unchecked"} onPress={() => setSelection()} />;
    }

  const setSelection = () => {
    setIsSelected(!isSelected);
  };
  const description = (student) => {
    if (filterSettings == null) return "";
    var ret = [];
    Object.entries(filterSettings).map(([title, reqs]) => {
      switch (title) {
        case "GPA": {
          if (student.qualifications.GPA >= parseFloat(reqs))
            ret.push("GPA: " + student.qualifications.GPA);
          break;
        }
        case "Degree":
        case "Graduation Year":
        case "Major": {
          if (reqs.includes(student.qualifications[title]))
            ret.push(title + ": " + student.qualifications[title]);
          break;
        }
      }
    });
    return ret.join("\n");
  };
  return (
    <Card style={styles.card} onPress={() => setSelection()}>
      <Card.Title
        title={studData.name}
        subtitle={description(studData)}
        subtitleStyle={styles.subtitle}
        left={avatar}
        right={icon1}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 5,
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
  },
  subtitle: {
    color: "green",
  },
});

export default StaticCandidateCard;
