import React from "react";
import renderer, { act } from "react-test-renderer";
import { render } from '@testing-library/react-native';
import 'jest-styled-components'
import { shallow, configure, mount, ReactWrapper } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import CandidateCard from "../components/CandidateCard";
import { Avatar, useTheme}  from "react-native-paper";
configure({ adapter: new Adapter() });
jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper"); //removes useNativeDriver error

describe("<CandidateCard />", () => {
  jest.useFakeTimers();
  let tree;
  studdata = {
      "name" : "Jason Derulo",
      "profile_photo" : "placeholder",
      "qualifications" : {
          "GPA" : 1.0,
          "Graduation Year" : 2022,
          "Degree" : "Master's",
          "Major" : "Vocal Performance",
          "skills" : "performance, singing, music composition"
      }
  };
  filterSettings = {
    GPA: null,
    "Graduation Year": [],
    Major: ["Vocal Performance", "Piano Performance"],
    Degree: [],
  };
  filterSettings2 = {
    GPA: null,
    "Graduation Year": [],
    Major: ["Piano Performance"],
    Degree: [],
  };
  it("renders", async () => {
    await act(async () => {
      tree = renderer.create(<CandidateCard studData = {studdata} id = "200" />);
    });
  });
  it("has the candidate's name.", async () => {
    const { getByText } = render(<CandidateCard studData = {studdata} id = "200" />);
    const name = getByText('Jason Derulo');
  });
  it("shows when the candidate is qualified for the filter.", async () => {
    const wrapper = shallow(<CandidateCard
        studData = {studdata}
        id = "200"
        filterSettings = {filterSettings} />);
    expect(wrapper.text().includes("Major: Vocal Performance"));
  });
  it("doesn't show when the candidate is not qualified for the filter.", async () => {
    const wrapper = shallow(<CandidateCard
        studData = {studdata}
        id = "200"
        filterSettings = {filterSettings} />);
    expect(wrapper.text().includes("Major: Vocal Performance")).toBe(false);
  });
});
