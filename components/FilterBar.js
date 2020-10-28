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

function TextStyle(props) {
  //change the text color if being selected
  const item = props.item;
  const filterSettings = props.filterSettings;
  let isEmpty = false;
  Object.entries(filterSettings).map(([name, value]) => {
    if (name == item.title && (value == null || value.length == 0)) {
      isEmpty = true;
    }
  });
  if (isEmpty || props.cleared) {
    return <Text>{item.title}</Text>;
  } else {
    return <Text style={styles.filterText}>{item.title}</Text>;
  }
}

const FilterBar = ({
  showModal,
  setModalData,
  filterSettings,
  setClearedSetting,
  isSelected,
}) => {
  const { colors } = useTheme();
  const [cleared, setCleared] = useState(false);
  const [shrinkSize, setShrinkSize] = useState("100%");
  const filterPress = (item) => {
    showModal();
    setModalData(item);
    setCleared(false);
    setClearedSetting(false);
  };

  const shrinksize = isSelected ? "81%" : "100%";
  const flatlist = (
    <View>
      <FlatList
        data={categoryList}
        horizontal={true}
        renderItem={({ item }) => (
          <Chip
            onPress={() => filterPress(item)}
            style={styles.chip}
            data-cy={item}
          >
            <TextStyle
              item={item}
              filterSettings={filterSettings}
              cleared={cleared}
            />
          </Chip>
        )}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        style={[
          styles.container,
          {
            backgroundColor: colors.primary,
            width: shrinksize,
          },
        ]}
      />
    </View>
  );
  return flatlist;
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 4,
    maxHeight: 40,
  },
  chip: {
    height: 30,
    margin: 1,
  },
  filterText: {
    color: "#ebae34",
    textAlignVertical: "top",
    fontWeight: "bold",
  },
});

export default FilterBar;
