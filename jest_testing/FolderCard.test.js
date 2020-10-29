import React from "react";
import renderer, { act } from "react-test-renderer";

import FolderCard from "../components/FolderCard";

jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper"); //removes useNativeDriver error

describe("<FolderCard />", () => {
  jest.useFakeTimers();
  let tree;
  it("renders ", async () => {
    await act(async () => {
      tree = renderer.create(<FolderCard item={["PM", [101, 102]]} />);
    });
  });
});
