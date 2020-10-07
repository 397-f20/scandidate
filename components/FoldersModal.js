import React, { useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Checkbox, Modal, Text, Button, useTheme } from "react-native-paper";

const data = {
  Favorites: [],
  Maybe: [],
};

const FoldersModal = ({ hideModal, modalVisible }) => {
  const { colors } = useTheme();
  const [checked, setChecked] = useState([]);

  const saveButton = () => {
    hideModal();
  };

  const Folders = () => {
    return (
      <View style={styles.singleSelect}>
        <FlatList
          data={Object.keys(data)}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.button}>
              <Checkbox
                onPress={() => setChecked([...checked, item])}
                status={checked.includes(item) ? "checked" : "unchecked"}
              />
              <Text>{item}</Text>
            </View>
          )}
        />
      </View>
    );
  };

  return (
    <Modal visible={modalVisible}>
      <View style={[styles.modal, { backgroundColor: colors.surface }]}>
        <Text style={styles.title}>My Folders</Text>
        <Folders />
        <Button mode="contained" onPress={() => saveButton()}>
          Save
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

export default FoldersModal;
