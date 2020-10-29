import React from "react";
import renderer, { act } from "react-test-renderer";
import FolderScreen from "../screens/FolderScreen";

jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper"); //removes useNativeDriver error

describe("<FolderScreen />", () => {
    it("FolderScreen renders", async () => {
      jest.useFakeTimers();
      let tree;
  
      await act(async () => {
        tree = renderer.create(<FolderScreen />);
      });
      tree = tree.toJSON();
  
    //   expect(tree.type).toBe('RCTSafeAreaView');
    });
  
  });