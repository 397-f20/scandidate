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
        <Text style={styles.title }>{modalData.title}</Text>
        {modalData.type == "multi-select" ?  <MultiSelect modalData={modalData.data} /> : <SingleSelect modalData={modalData.data} />}
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
  const [checked, setChecked] = useState();
  const { colors } = useTheme();
  return (
    <View style={styles.singleSelect}>
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

//multiselect the filters
const MultiSelect = ({ modalData }) => {
    const [checked, setChecked] = useState([]);
    const { colors } = useTheme();
    // selected.includes(course) ? selected.filter(x => x !== course) : [...selected, course]
    return (
      <View style={styles.singleSelect}>
          <FlatList
            data={modalData}
            renderItem={({ item }) => (
              <View style={styles.button}>
                <RadioButton 
                    status={ checked.includes(item.name) ? 'checked' : 'unchecked' } 
                    onPress={() => checked.includes(item.name) ? setChecked(checked.filter(x => x !== item.name)) : setChecked([...checked, item.name])}
                    value={item.name} />
                <Text>{item.name}</Text>
              </View>
            )}
          />

      </View>
    );
  };
  

const styles = StyleSheet.create({
  modal: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
    height: "80%",
  },
  singleSelect: {
    flex: 1,
    justifyContent: "flex-start",
  },
  button: {
    flexDirection: "row",
    alignItems: 'center',

  },
  title:{
      alignSelf:"center",
      fontSize: 20 ,
  }
});

export default ModalOptions;
