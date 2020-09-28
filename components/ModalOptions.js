import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
  } from "react-native";
import { Modal, Portal, Text, Button, Provider } from 'react-native-paper';

const ModalOptions = ({hideModal, modalVisible}) => {

    const GPAMenu = (
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
        >
         <View style = {styles.modal}>
          <Text style={{ fontSize: 20 }}>MODAL</Text>
          <TouchableOpacity
            onPress={() => hideModal() }
            style={styles.saveButton}>
            <Text style={{ fontSize: 20 }}>Save Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => hideModal() }
            style={styles.cancelButton}>
            <Text style={{ fontSize: 20 }}>Cancel</Text>
          </TouchableOpacity>
          </View>
        </Modal>
      );

      return GPAMenu;
}

const buttonBase = {
    flex: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 10,
    color:"#FFFFFF",

}

const styles = StyleSheet.create({
    modal: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        borderColor: "blue",
        padding: 35,
        alignItems: "center",
    },
    saveButton: {
        ...buttonBase,
        backgroundColor:"#4eb5f1",
    },
    cancelButton: {
        ...buttonBase,
        backgroundColor:"#999999",
    },
})

export default ModalOptions;
