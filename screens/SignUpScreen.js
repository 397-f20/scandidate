import React, { useEffect, useState } from "react";
import { Button, Image, Text, TextInput, View, StyleSheet } from "react-native";
import { Menu, useTheme } from "react-native-paper";

const SignUpScreen = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const { colors } = useTheme();

  const [role, setRole] = useState("Select your role");

  const selectRole = (
    <Text style={styles.roleSelect} onPress={openMenu}>
      {role}
    </Text>
  );
  const menu = (
    <Menu
      visible={menuVisible}
      onDismiss={closeMenu}
      anchor={selectRole}
      contentStyle={{ backgroundColor: colors.background }}
    >
      <Menu.Item
        onPress={() => {
          closeMenu();
          setRole("Student");
        }}
        title="Student"
      />
      <Menu.Item
        onPress={() => {
          closeMenu();
          setRole("Recruiter");
        }}
        title="Recruiter"
      />
    </Menu>
  );

  return (
    <View style={styles.container}>
      <Image
        source={require("../icon.png")}
        style={{ height: 100, width: 100 }}
      />
      <Text>Scandidate</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text>Role:</Text>
        {menu}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1"
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginHorizontal: 10,
    marginBottom: 10
  },
  roleSelect: {
    backgroundColor: "white",
    padding: 5,
    borderBottomWidth: 2,
    width: 125
  }
});

export default SignUpScreen;
