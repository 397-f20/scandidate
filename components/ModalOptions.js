import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import { Modal, Text, Button, useTheme, RadioButton } from "react-native-paper";

const ModalOptions = ({ hideModal, modalVisible, modalData }) => {
  const { colors } = useTheme();
  const { modalStyle } = styles.modal;
  const GPAMenu = (
    <Modal visible={modalVisible}>
      <View style={[styles.modal, { backgroundColor: colors.surface }]}>
        <Text style={{ fontSize: 20 }}>{modalData.title}</Text>
        <SingleSelect modalData={modalData.data} />
        <Button mode="contained" onPress={() => hideModal()}>
          Save Filter
        </Button>
        <Button mode="text" onPress={() => hideModal()}>
          Cancel
        </Button>
      </View>
    </Modal>
  );

  return GPAMenu;
};

const SingleSelect = ({ modalData }) => {
  const [checked, setChecked] = useState("2020");
  const { colors } = useTheme();
  console.log(checked);
  return (
    <View>
      <RadioButton.Group
        onValueChange={(checked) => setChecked(checked)}
        value={checked}
      >
        <FlatList
          data={modalData}
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

const styles = StyleSheet.create({
  modal: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    height: "80%",
  },
  singleSelect: {
    flex: 1,
  },
  button: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
});

export default ModalOptions;
