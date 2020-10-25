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
const db = firebase.database().ref("companies/Google/recruiters/Jen B/Folders");

const FolderScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [folders, setFolders] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
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

  const folderIcon = (props) => (
    <List.Icon {...props} icon="folder" size={24} />
  );

  const dots = (
    <IconButton
      icon="dots-vertical"
      onPress={() => {
        openMenu();
        console.log("menu", menuVisible);
      }}
    />
  );

  const Folders = () => {
    return (
      <FlatList
        data={Object.entries(folders)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Card
            style={styles.card}
            onPress={() =>
              navigation.navigate("FolderContents", { folder: item })
            }
          >
            <Card.Title
              title={item[0]}
              subtitle={item[1].length - 1 + " candidate(s)"}
              left={folderIcon}
              right={() => menu}
            />
          </Card>
        )}
      />
    );
  };

  const menu = () => {
    console.log("menu is here");
    return (
      <Menu
        visible={menuVisible}
        onDismiss={() => {
          console.log("dismissed");
          closeMenu();
        }}
        anchor={dots}
        contentStyle={{ backgroundColor: colors.background }}
      >
        <Menu.Item onPress={() => {}} title="Edit Folder Name" />
        <Menu.Item
          onPress={() => {
            // Alert.alert("Are u sure");
            // closeMenu();
          }}
          title="Delete Folder"
        />
      </Menu>
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
