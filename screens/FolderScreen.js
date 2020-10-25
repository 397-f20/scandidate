import React, { useContext, useState, useEffect } from "react";
import { Alert, FlatList, ScrollView, StyleSheet } from "react-native";
import { firebase } from "../firebase";
import {
  Appbar,
  Card,
  IconButton,
  List,
  Menu,
  useTheme,
  Button,
  Portal,
} from "react-native-paper";
import AddFolderModal from "../components/AddFolderModal";
import FolderCard from "../components/FolderCard";
import DeleteFolderDialog from "../components/DeleteFolderDialog";
const db = firebase.database().ref("companies/Google/recruiters/Jen B/Folders");

const FolderScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [folders, setFolders] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [deleteFolderVisible, setDeleteFolderVisible] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState("");
  const openMenu = () => {
    setMenuVisible(true);
    console.log("menu is open");
  };
  const closeMenu = () => setMenuVisible(false);

  // database
  useEffect(() => {
    const handleData = (snapshot) => {
      if (snapshot.val()) {
        setFolders(snapshot.val());
      }
    };
    db.on("value", handleData, (error) => alert(error));
    return () => {
      db.off("value", handleData);
    };
  }, []);
  const Folders = () => {
    return (
      <FlatList
        data={Object.entries(folders)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <FolderCard
          navigation={navigation}
          item={item}
          setDeleteFolderVisible={setDeleteFolderVisible}
          setSelectedFolder={setSelectedFolder}/ >
        )}
      />
    );
  };
  const Header = () => {
    return (
      <Appbar.Header>
        <Appbar.Content title="My Folders" />
        <Appbar.Action
          icon="plus"
          onPress={() => {
            setModalVisible(true);
          }}
        />
      </Appbar.Header>
    );
  };

  return (
    <ScrollView style={{ backgroundColor: colors.background }}>
      <Header />
      <Folders />
      <Portal>
        <AddFolderModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          folders={folders}
        />
        <DeleteFolderDialog
        setDeleteFolderVisible={setDeleteFolderVisible}
        deleteFolderVisible={deleteFolderVisible}
        selectedFolder={selectedFolder}
        />
      </Portal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 5,
  },
});

export default FolderScreen;
