/**
 * @jest-environment jsdom
 */
import React from "react";
import { fireEvent, render, waitFor } from "react-native-testing-library";
import { expect, it } from "@jest/globals";

import { shallow, configure, mount } from "enzyme";
import { Modal, Button, Chip } from "react-native-paper";
import FilterBar from "../components/FilterBar";
import FlatList from "react-native";

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

const fs = {
  GPA: null,
  "Graduation Year": [],
  Major: ["Vocal Performance", "Piano Performance"],
  Degree: [],
};

describe("<FilterBar />", () => {
  jest.useFakeTimers();
  it("renders correctly", () => {
    shallow(<FilterBar filterSettings={fs} isSelected={false} />);
  });

  it("has all the chips", () => {
    const wrapper = shallow(
      <FilterBar filterSettings={fs} isSelected={false} />
    );
    const fl = wrapper.find(Chip);
    expect(fl.length).toEqual(1); //chips appear
  });

  //it("renders modal when pressed", async () => {
  // const wrapper = shallow()
  //});
});
