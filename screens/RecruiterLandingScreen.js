import CandidateCard from "../components/CandidateCard";
import FilterBar from "../components/FilterBar";
import FoldersModal from "../components/FoldersModal";
import ModalOptions from "../components/ModalOptions";
import React, { useState, useEffect } from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Chip, Portal, Provider, useTheme,Button } from "react-native-paper";
import { firebase } from "../firebase";



var numSelected = 0; //calculate the width of the filter number text
function CountNum(props){ //count how many filters has been selected and display in text
  let count = 0; //count the filters that's not selected
  let lenCount = 0; //count the length of filters
  if(props.clearedSetting){
      numSelected = 0;
      return <Text> {numSelected} </Text>
  }
  Object.entries(props.filterSettings).map(([name, value]) => {
      lenCount ++;
      if(value == null){
          count++;
      }
      else{
          if(value.length == 0){
              count++;
          }
      } 
  } )
  numSelected = lenCount - count;
  if(numSelected == 0){
      return <Text> {numSelected} </Text>
  }
  else{
      return <Text style={styles.filterText}> {numSelected} </Text>
  }
}

const RecruiterLandingScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState("Loading...");
  const [foldersVisible, setFoldersVisible] = useState(false);
  const [studentID, setStudentID] = useState(null);
  const initialSettings = {
    GPA: null,
    "Graduation Year": [],
    Major: [],
    Degree: [],
  };

  const [data, setData] = useState({ students: [] });
  const [filterSettings, setFilterSettings] = useState(initialSettings);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  const hideFolders = () => setFoldersVisible(false);
  const { colors } = useTheme();

  // database
  useEffect(() => {
    const db = firebase.database().ref("students");
    const handleData = (snap) => {
      if (snap.val()) {
        setData({students: snap.val()});
      }
    };
    db.on("value", handleData, (error) => alert(error));
    return () => {
      db.off("value", handleData);
    };
  }, []);

  const filterStudents = () => {
    let newScores = {};
    Object.entries(data.students).map(([id, student]) => {
      let score = 0;
      Object.entries(filterSettings).map(([title, reqs]) => {
        switch (title) {
          case "GPA": {
            if (reqs === null || student.qualifications.GPA >= parseFloat(reqs))
              score++;
            break;
          }
          case "Degree":
          case "Graduation Year":
          case "Major": {
            if (
              reqs.length === 0 ||
              reqs.includes(student.qualifications[title])
            )
              score++;
            break;
          }
        }
      });
      newScores[id] = score;
    });

    return Object.entries(newScores)
      .filter(([id, score]) => score >= Object.keys(filterSettings).length)
      .map((s) => s[0]);
  };

  //determine if the selected filters will be cleared or not
  const [clearedSetting, setClearedSetting] = useState(false); 
  const clearFilter = () => { //called when press the x button
    setClearedSetting(true);
    setFilterSettings(initialSettings);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      
      <FilterBar
        showModal={showModal}
        setModalData={setModalData}
        modalData={modalData}
        filterSettings={filterSettings} //based on filterSettings highlight the filterBar
        setClearedSetting={setClearedSetting}//once pressed the filterBar, clearOption is resetted
      />
      {filterSettings === initialSettings ? null : (
        <Text>
          {filterStudents().length} student(s) matched your qualifications.
        </Text>
      )}

      <Chip style={styles.chipSelection}>  {/* add the clear filter option on the right */}
        <CountNum filterSettings={filterSettings} clearedSetting={clearedSetting} /> 
        <Button onPress={() => clearFilter()} style={[styles.buttonStyle]}> x </Button>
      </Chip>   

      <Portal>
        <ModalOptions
          filterSettings={filterSettings}
          hideModal={hideModal}
          modalVisible={modalVisible}
          modalData={modalData}
          setFilterSettings={setFilterSettings}
        />
      </Portal>
      <Portal>
        <FoldersModal hideModal={hideFolders} modalVisible={foldersVisible} studentID={studentID}/>
      </Portal>
      <FlatList
        data={
          filterStudents().length == 0
            ? Object.keys(data.students)
            : filterStudents()
        }
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={(item) => (
          <CandidateCard
            studData={data.students[item.item]}
            id={item.item}
            navigation={navigation}
            setFoldersVisible={setFoldersVisible}
            setStudentID={setStudentID}
          />
        )}
      />
      

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    flex: 1,
    justifyContent: "center",
  },
  chipSelection:{
    width: 50 + (numSelected.toString().length)*10,
    position: 'absolute',
    right:10,
    top: 3,
  },
  buttonStyle: {
    borderRadius: 0,
    flexDirection: "row",
    alignItems: "center",
    width: 10,
    height: 10,
  },
  filterText:{
    color: "#ebae34",
    textAlignVertical: "top",
    fontWeight: "bold",
  }
});

export default RecruiterLandingScreen;
