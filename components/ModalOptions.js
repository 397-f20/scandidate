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

const ModalOptions = ({setModalVisible, modalVisible}) => {
    
    const GPAMenu = (
        <Modal
          animationType="none"
          transparent={true}
          style={styles.modal}
          visible={false}
          modalVisible={false}
        >
          <Text style={{ fontSize: 20 }}>MODAL</Text>
        </Modal>
      );

      return GPAMenu;
}

const styles = StyleSheet.create({
    modal: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        borderColor: "black",
        padding: 35,
        alignItems: "center",
      },
})

export default ModalOptions;