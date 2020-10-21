import React, { useContext, useState, useEffect } from "react";
import { FlatList, ScrollView, StyleSheet } from "react-native";
import { firebase } from "../firebase";
import { Appbar, List, useTheme, Button, Portal } from "react-native-paper";
import AddFolderModal from "../components/AddFolderModal";
const db = firebase.database().ref("companies/Google/recruiters/Jen B/Folders");



const FolderScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [folders, setFolders] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const one = 1;
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
          <List.Item
            onPress={() =>
              navigation.navigate("FolderContents", { folder: item })
            }
            title={item[0]}
            description={item[1].length-1 + " candidate(s)"}
            left={(props) => <List.Icon {...props} icon="folder" size={24} />}
          />
        )}
      />
    );
  };

  const Header = () => {
    return (
      <Appbar.Header>
        <Appbar.Content title="My Folders" />
        <Appbar.Action icon="plus" onPress={() => {setModalVisible(true)}} />
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



export default FolderScreen;
