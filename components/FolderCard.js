import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import {
  Avatar,
  Card,
  IconButton,
  Menu,
  Surface,
  Title,
  Caption,
  List,
  Dialog,
  Portal,
  useTheme,
} from "react-native-paper";

const FolderCard = ({navigation, item, setDeleteFolderVisible, setSelectedFolder}) => {
  const { colors } = useTheme();
  const [menuVisible, setMenuVisible] = useState(false);
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const folderIcon = (props) => (
    <List.Icon {...props} icon="folder" size={24} />
  );

  const dots = <IconButton icon="dots-vertical" onPress={openMenu} />;
  const menu = () => {
    return (
      <Menu
        visible={menuVisible}
        onDismiss={() => {closeMenu();}}
        anchor={dots}
        contentStyle={{ backgroundColor: colors.background }}
      >
        <Menu.Item onPress={() => {closeMenu()}} title="Edit Folder Name" />
        <Menu.Item
          onPress={() => {
              setDeleteFolderVisible(true);
              setSelectedFolder(item[0]);
              closeMenu();
          }}
          title="Delete Folder"
        />
      </Menu>
    );
  };
  return (
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
          right={menu}
        />
      </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 5,
  },
});

export default FolderCard;
