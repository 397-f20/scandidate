import "react-native-gesture-handler";
import RecruiterLandingScreen from "./screens/RecruiterLandingScreen";
import StudentDetailScreen from "./screens/StudentDetailScreen";
import StudentLandingScreen from "./screens/StudentLandingScreen";
import StudentProfileScreen from "./screens/StudentProfileScreen";
import FolderScreen from "./screens/FolderScreen";
import FolderContents from "./screens/FolderContents";
import MultiSelectScreen from "./screens/MultiSelectScreen";

import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { firebase } from "./firebase";
import UserContext from "./UserContext";
import {
  List,
  BottomNavigation,
  DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Login = createStackNavigator();
const Student = createBottomTabNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#005B7F",
    accent: "#448CCB",
    background: "#F5F5F5",
    surface: "#F1ECE2",
    medium: "#307C3C",
  },
};

const App = () => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((auth) => {
      setAuth(auth);
    });
  }, []);

  useEffect(() => {
    if (auth && auth.uid) {
      const db = firebase.database().ref("users").child(auth.uid);
      const handleData = (snap) => {
        setUser({ uid: auth.uid, ...snap.val() });
      };
      db.on("value", handleData, (error) => alert(error));
      return () => {
        db.off("value", handleData);
      };
    } else {
      setUser(null);
    }
  }, [auth]);

  return (
    <UserContext.Provider value={user}>
      <PaperProvider theme={theme}>
        <NavigationContainer data-cy="nav">
          <Login.Navigator>
            <Login.Screen
              component={LoginScreen}
              name="LoginScreen"
              options={{ title: "Login" }}
            />
            <Login.Screen
              component={SignUpScreen}
              name="signup"
              options={{ title: "Sign Up" }}
            />
            <Login.Screen
              component={tabs}
              name="tabs"
              options={{ headerShown: false }}
            />
            <Login.Screen
              component={student}
              name="student"
              options={{ headerShown: false }}
            />
          </Login.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </UserContext.Provider>
  );
};

const student = () => {
  return (
    <Student.Navigator>
      {/* <Student.Screen
        component={StudentLandingScreen}
        name="StudentLandingScreen"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <List.Icon
              name="home"
              color={color}
              size={20}
              icon="wallet-travel"
            />
          ),
        }}
      /> */}
      <Student.Screen
        component={StudentProfileScreen}
        name="StudentProfileScreen"
        options={{
          title: "My Profile",
          tabBarIcon: ({ color, size }) => (
            <List.Icon
              name="home"
              color={color}
              size={20}
              icon="face-profile"
            />
          ),
        }}
      />
    </Student.Navigator>
  );
};

const tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        component={home}
        name="Home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <List.Icon
              name="home"
              color={color}
              size={20}
              icon="account-group"
            />
          ),
        }}
      />
      <Tab.Screen
        component={folders}
        name="Folders"
        options={{
          title: "My Folders",
          tabBarIcon: ({ color, size }) => (
            <List.Icon
              name="home"
              color={color}
              size={20}
              icon="folder-outline"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const folders = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={FolderScreen}
        name="FolderScreen"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={FolderContents}
        name="FolderContents"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={MultiSelectScreen}
        name="MultiSelectScreen"
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const home = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={RecruiterLandingScreen}
        name="RecruiterLandingScreen"
        options={{ title: "Home" }}
      />
      <Stack.Screen
        name="StudentDetailScreen"
        component={StudentDetailScreen}
        options={{ title: "Student Detail" }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
