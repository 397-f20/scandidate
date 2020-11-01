import React from "react";
import "react-native";
import { expect, it } from "@jest/globals";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import { Button } from "react-native-paper";
import AddFolderModal from "../components/AddFolderModal";
import RecruiterLandingScreen from "../screens/RecruiterLandingScreen";

jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper"); //removes useNativeDriver error

configure({ adapter: new Adapter() });

describe("<AddFolderModal />", () => {
  jest.useFakeTimers();
  it("renders correctly", async () => {
    await shallow(<AddFolderModal />);
  });

  it("Modal and Buttons appear", async () => {
    const wrapper = await shallow(<AddFolderModal />);
    expect(wrapper.find(Button).length).toEqual(2); //save and cancel buttons render
  });
});

describe("<RecruiterLandingScreen />", () => {
  jest.useFakeTimers();
  it("renders correctly", async () => {
    await shallow(<RecruiterLandingScreen />);
  });
});
