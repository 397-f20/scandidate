import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import {
  Avatar,
  Card,
  IconButton,
  Menu,
  Surface,
  Title,
  Caption,
  useTheme,
} from "react-native-paper";

const CandidateCard = ({
  studData,
  id,
  navigation,
  setFoldersVisible,
  setStudentID,
  filterSettings,
  setNotesVisible,
}) => {
  const { colors } = useTheme();
  const [menuVisible, setMenuVisible] = useState(false);
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const avatar = (props) => {
    const photo = studData.profile_photo;
    if (photo == "placeholder") {
      return (
        <Avatar.Icon
          {...props}
          icon="account-circle"
          backgroundColor={colors.accent}
        />
      );
    }
    return <Image style={styles.photo} source={{ uri: photo }} />;
  };

  const dots = <IconButton icon="dots-vertical" onPress={openMenu} />;

  const menu = (
    <Menu
      visible={menuVisible}
      onDismiss={closeMenu}
      anchor={dots}
      contentStyle={{ backgroundColor: colors.background }}
    >
      <Menu.Item onPress={() => {}} title="Hide Profile" />
      <Menu.Item
        onPress={() => {
          closeMenu();
          setFoldersVisible(true);
          setStudentID(id);
        }}
        title="Add to Folder"
      />
      <Menu.Item
        onPress={() => {
          closeMenu();
          setNotesVisible(true);
        }}
        title="Add a Note"
      />
    </Menu>
  );
  const description = (student) => {
    if (filterSettings == null) return "";
    var ret = [];
    Object.entries(filterSettings).map(([title, reqs]) => {
      switch (title) {
        case "GPA": {
          if (student.qualifications.GPA >= parseFloat(reqs))
            ret.push("GPA: " + student.qualifications.GPA);
          break;
        }
        case "Degree":
        case "Graduation Year":
        case "Major": {
          if (reqs.includes(student.qualifications[title]))
            ret.push(title + ": " + student.qualifications[title]);
          break;
        }
      }
    });
    return ret.join("\n");
  };

  return (
    <Card
      style={styles.card}
      onPress={() =>
        navigation.navigate("StudentDetailScreen", { studData, id })
      }
    >
      <Card.Title
        title={studData.name}
        subtitle={description(studData)}
        subtitleStyle={styles.subtitle}
        left={avatar}
        right={() => menu}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 5,
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
  },
  subtitle: {
    color: "green",
  },
});

export default CandidateCard;
