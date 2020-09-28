import RecruiterLandingScreen from "./screens/RecruiterLandingScreen";
import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#8A5D3D',
    accent: '#67BD45',
    background: "#5A3E29",
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
