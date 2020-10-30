import "react-native";
import React from "react";
import { fireEvent, render, waitFor } from "react-native-testing-library";
import { expect, it } from "@jest/globals";
import ModalOptions from "./components/ModalOptions";

import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import { Modal, Button, Chip } from "react-native-paper";
import RecruiterLandingScreen from "./screens/RecruiterLandingScreen";
import FilterBar from "./components/FilterBar";

configure({ adapter: new Adapter() });

const data = {
  title: "GPA",
  type: "single-select",
  data: [
    {
      name: "4.0",
    },
    {
      name: "3.5",
    },
    {
      name: "3.0",
    },
    {
      name: "2.5",
    },
    {
      name: "2.0",
    },
    {
      name: "1.5",
    },
    {
      name: "1.0",
    },
    {
      name: "0.5",
    },
    {
      name: "0.0",
    },
  ],
};

describe("ModalOptions", () => {
  it("renders correctly", () => {
    shallow(<ModalOptions modalData={data} />);
  });

  it("modal parts are visible", () => {
    const wrapper = shallow(<ModalOptions modalData={data} />);
    expect(wrapper.find(Button).length).toEqual(2); //save and cancel buttons render
  });
});

describe("RecruiterLandingScreen", () => {
  it("renders correctly", () => {
    shallow(<RecruiterLandingScreen />);
  });

  it("filter bar is visible", async () => {
    const wrapper = shallow(<RecruiterLandingScreen />);

    const fb = await wrapper.find(FilterBar);
    expect(fb.length).toEqual(1); //filter bar appears
  });
});
