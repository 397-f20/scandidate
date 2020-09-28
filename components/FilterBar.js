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
import { Chip, useTheme } from "react-native-paper"

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


const FilterBar = ({showModal, setModalData}) => {
  const [GPA, setGPA] = useState("");
  const {colors} = useTheme();

  const flatlist = (
    <View>
    <FlatList
      data={categoryList}
      horizontal={true}
      renderItem={({ item }) => (
        <Chip onPress = {() => showModal()} style = {styles.chip}>
          <Text>{item}</Text>
        </Chip>
      )}
      showsHorizontalScrollIndicator={false}
      style={[styles.container, {backgroundColor: colors.primary}]}
    />
    </View>
  );

  return flatlist;
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    maxHeight: 40,
    width: "100%",
  },
  chip: {
    height: 30,
    margin: 1,
  },
});

export default FilterBar;
