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
import { Chip, useTheme } from "react-native-paper";
import data from "../qualifications.json";

const categoryList = Object.values(data);

const FilterBar = ({ showModal, setModalData }) => {
  const [GPA, setGPA] = useState("");
  const { colors } = useTheme();

  const filterPress = (item) => {
    showModal();
    setModalData(item);
  };

  const flatlist = (
    <View>
      <FlatList
        data={categoryList}
        horizontal={true}
        renderItem={({ item }) => (
          <Chip onPress={() => filterPress(item)} style={styles.chip}>
            <Text>{item.title}</Text>
          </Chip>
        )}
        showsHorizontalScrollIndicator={false}
        style={[styles.container, { backgroundColor: colors.primary }]}
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
