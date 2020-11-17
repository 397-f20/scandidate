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

function DynamicCheckbox(props){
    //if this id found in the selection Data, then mark as checked
    //else mark as unchecked
    let found = false;
    for(let i=0; i<props.selectionData.length; i++){
        if(props.selectionData[i] === props.id){
            found = true;
            break;
        } 
    }
    if(found){
        return <Checkbox.Android status={"checked"} onPress={() => props.setSelection()} />;
    }else{
        return <Checkbox.Android status={"unchecked"} onPress={() => props.setSelection()} />;
    }
}

const StaticCandidateCard = ({
  studData,
  id,
  setFoldersVisible,
  setStudentID,
  filterSettings,
  setNotesVisible,
  selectionData,
  setSelectionData, //selection for every card
}) => {
  const { colors } = useTheme();
  const [isSelected, setIsSelected] = useState(false); //selection for single card

  const icon1 = (props) => { //arrange the order
    return <IconButton icon="arrow-collapse-vertical" onPress={() => {
        console.log("press and drag to rearrange order");
    }} />;
  };


  const avatar = props => { 
      return <DynamicCheckbox selectionData={selectionData} id={id} setSelection={setSelection} />
    }

  const setSelection = () => {
    //if new id is not in selectedData: add
    //else: remove because there are only two options for the status
    let found = false;
    let i = -1; //index for deletion
    for(i = 0; i < selectionData.length; i++){ 
        if ( selectionData[i] === id) {
            found = true;
            break;
        }
    }
    if(found){
        delete selectionData[i]
        selectionData.splice(i, 1);
    }else{
        selectionData = [...selectionData, id]
    }
    setIsSelected(!isSelected);
    setSelectionData(selectionData) //send all selection data to the screeen
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
        // right={icon1}
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
