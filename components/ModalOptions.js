import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
  } from "react-native";
import { Modal, Text, Button, useTheme } from 'react-native-paper';


const ModalOptions = ({hideModal, modalVisible, modalData}) => {
    const {colors} = useTheme();
    const {modalStyle} = styles.modal;
    const GPAMenu = (
        <Modal visible={modalVisible}>
          <View style = {[styles.modal, {backgroundColor: colors.surface}]}>
              <Text style={{ fontSize: 20 }}>{modalData}</Text>
              <Button
                mode="contained"
                onPress={() => hideModal()}>
                Save Filter
              </Button>
              <Button
                mode="text"
                onPress={() => hideModal()}>
                Cancel
              </Button>
          </View>
        </Modal>
      );

      return GPAMenu;
}


const styles = StyleSheet.create({
    modal: {
        margin: 20,
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
    },
})

export default ModalOptions;
