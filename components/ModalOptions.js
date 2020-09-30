import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import {
  Checkbox,
  Modal,
  Text,
  Button,
  useTheme,
  RadioButton,
} from "react-native-paper";

const ModalOptions = ({
  filterSettings,
  hideModal,
  modalVisible,
  modalData,
  setFilterSettings,
}) => {
  const { colors } = useTheme();
  const { modalStyle } = styles.modal;
  console.log(filterSettings[modalData.title]);

  const [checked, setChecked] = useState(filterSettings);
  console.log("c", checked);

  const saveButton = () => {
    hideModal();
    setFilterSettings({
      ...filterSettings,
      [modalData.title]: checked[modalData.title],
    });
  };

  const SingleSelect = () => {
    return (
      <View style={styles.singleSelect}>
        <RadioButton.Group
          onValueChange={(check) => {
            setChecked({ ...checked, [modalData.title]: check });
          }}
          value={checked[modalData.title]}
        >
          <FlatList
            data={modalData.data}
            renderItem={({ item }) => (
              <View style={styles.button}>
                <RadioButton value={item.name} />
                <Text>{item.name}</Text>
              </View>
            )}
          />
        </RadioButton.Group>
      </View>
    );
  };

  const MultiSelect = () => {
    return (
      <View style={styles.singleSelect}>
        <FlatList
          data={modalData.data}
          renderItem={({ item }) => (
            <View style={styles.button}>
              <Checkbox
                onPress={() =>
                  checked[modalData.title].includes(item.name)
                    ? setChecked({
                        ...checked,
                        [modalData.title]: checked.filter(
                          (x) => x !== item.name
                        ),
                      })
                    : setChecked({
                        ...checked,
                        [modalData.title]: [
                          ...checked[modalData.title],
                          item.name,
                        ],
                      })
                }
                status={
                  checked[modalData.title].includes(item.name)
                    ? "checked"
                    : "unchecked"
                }
              />
              <Text>{item.name}</Text>
            </View>
          )}
        />
      </View>
    );
  };

  return (
    <Modal visible={modalVisible}>
      <View style={[styles.modal, { backgroundColor: colors.surface }]}>
        <Text style={styles.title}>{modalData.title}</Text>
        {modalData.type === "multi-select" ? <MultiSelect /> : <SingleSelect />}
        <Button mode="contained" onPress={() => saveButton()}>
          Save Filter
        </Button>
        <Button mode="text" onPress={() => hideModal()}>
          Cancel
        </Button>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
  },
  singleSelect: {
    flex: 1,
    justifyContent: "flex-start",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    alignSelf: "center",
    fontSize: 20,
  },
});

export default ModalOptions;
