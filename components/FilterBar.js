import React from "react";
import {
  FlatList,
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

const Pill = ({ category }) => {
  return (
    <TouchableOpacity style={styles.pill}>
      <Text>{category}</Text>
    </TouchableOpacity>
  );
};

const FilterBar = () => {
  return (
    <FlatList
      data={categoryList}
      horizontal={true}
      renderItem={({ item }) => <Pill category={item} />}
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    maxHeight: 40,
    width: "100%",
  },
  pill: {
    backgroundColor: "#d3d3d3",
    height: 30,
    margin: 5,
    padding: 5,
  },
});

export default FilterBar;
