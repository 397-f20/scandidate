import React from "react";
import renderer, { act } from "react-test-renderer";
import RecruiterLandingScreen from "../screens/RecruiterLandingScreen";
import FolderScreen from "../screens/FolderScreen";
import { render, fireEvent } from "@testing-library/react-native";

jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper"); //removes useNativeDriver error

describe("Navigation", () => {
  it("home screen renders", () => {
    async () => {
      render(<App />);
    };
  });

  // Check if folder button exists in navigation
  it("My Folders button renders", () => {
    async () => {
      const { container, getByText } = render(<RecruiterLandingScreen />);
      await waitFor(
        () => {
          expect(getByText("My Folders")).toBeInTheDocument();
        },
        { timeout: 3000 }
      );
    };
  });

  // Check if home button exists in navigation
  it("Home button renders", () => {
    async () => {
      const { container, getByText } = render(<FolderScreen />);
      await waitFor(
        () => {
          expect(getByText("Home")).toBeInTheDocument();
        },
        { timeout: 3000 }
      );
    };
  });
});
