import RecruiterLandingScreen from "./screens/RecruiterLandingScreen";
import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Provider as PaperProvider } from 'react-native-paper';

const Stack = createStackNavigator();

const App = () => {
  return (
    <PaperProvider>
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
