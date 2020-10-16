import React, { useContext, useState, useEffect } from "react";
import { FlatList, ScrollView, StyleSheet } from "react-native";
import { firebase } from "../firebase";
import { Appbar, List, useTheme } from "react-native-paper";

const db = firebase.database().ref("companies/Google/recruiters/Jen B/Folders");

const FolderScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [folders, setFolders] = useState([]);
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
            description={item[1].length + " candidates"}
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
      </Appbar.Header>
    );
  };

  return (
    <ScrollView style={{ backgroundColor: colors.background }}>
      <Header />
      <Folders />
    </ScrollView>
  );
};

export default FolderScreen;
