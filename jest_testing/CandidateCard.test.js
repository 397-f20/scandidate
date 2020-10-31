import React from "react";
import renderer, { act } from "react-test-renderer";
import { render } from '@testing-library/react-native'
import CandidateCard from "../components/CandidateCard";
import { Avatar, useTheme}  from "react-native-paper";

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
  it("renders", async () => {
    await act(async () => {
      tree = renderer.create(<CandidateCard studData = {studdata} id = "200" />);
    });
  });
  it("has the candidate's name and major", async () => {
    const { getByText } = render(<CandidateCard studData = {studdata} id = "200" />);
    const name = getByText('Jason Derulo');
    const major = getByText('Vocal Performance');
  });
});
