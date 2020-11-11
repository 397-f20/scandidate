import React from "react";
import renderer, { act } from "react-test-renderer";
import RecruiterLandingScreen from "../screens/RecruiterLandingScreen";
import FolderScreen from "../screens/FolderScreen";
import { render, fireEvent } from "@testing-library/react-native";

jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper"); //removes useNativeDriver error

describe("<RecruiterLandingScreen />", () => {
  it("RecruiterLandingScreen renders", async () => {
    jest.useFakeTimers();
    let tree;

    await act(async () => {
      tree = renderer.create(<RecruiterLandingScreen />);
    });
    tree = tree.toJSON();
  });
});
