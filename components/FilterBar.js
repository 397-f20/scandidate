import React, { useState } from "react";
import {
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const categoryList = [
  "GPA",
  "Major",
  "Skills",
  "Experience",
  "Graduation Year",
  "Work Authorization",
];

const GPAData = [
  {
    id: "0",
    name: "No Minimum",
  },
  {
    id: "1",
    name: "1.0",
  },
  {
    id: "2",
    name: "2.0",
  },
  {
    id: "3",
    name: "3.0",
  },
  {
    id: "4",
    name: "4.0",
  },
];

const FilterBar = () => {
  const [GPA, setGPA] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const GPAMenu = (
    <Modal
      animationType="none"
      transparent={true}
      style={styles.modal}
      visible={true}
    >
      <Text style={{ fontSize: 20 }}>MODAL</Text>
    </Modal>
  );

  const flatlist = (
    <FlatList
      data={categoryList}
      horizontal={true}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.pill}>
          <Text>{item}</Text>
        </TouchableOpacity>
      )}
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    />
  );

  return flatlist;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    maxHeight: 40,
    width: "100%",
  },
  modal: {
    backgroundColor: "#d2d2d2",
    height: "50%",
    position: "absolute",
    width: "75%",
  },
  pill: {
    backgroundColor: "#d3d3d3",
    height: 30,
    margin: 5,
    padding: 5,
  },
});

export default FilterBar;
