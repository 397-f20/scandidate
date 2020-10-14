import "react-native-gesture-handler";
import RecruiterLandingScreen from "./screens/RecruiterLandingScreen";
import StudentDetailScreen from "./screens/StudentDetailScreen";

import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#005B7F",
    accent: "#448CCB",
    background: "#F5F5F5",
    surface: "#F1ECE2",
    medium: "#307C3C"
  },
};

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
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
      </NavigationContainer>
    </PaperProvider>
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