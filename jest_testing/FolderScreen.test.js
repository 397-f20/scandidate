import React from "react";
import renderer, { act } from "react-test-renderer";
import RecruiterLandingScreen from "../screens/RecruiterLandingScreen";
import FolderScreen from "../screens/FolderScreen";
import { render, fireEvent } from '@testing-library/react-native'; 
// npm install --save-dev @testing-library/react-native
// import '@testing-library/jest-dom/extend-expect'
// npm install --save-dev @testing-library/jest-dom

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

describe('Folders', () => {
    it('folders page renders', () => {
      async () => {
        render(<FolderScreen />);
      }
    })

    // fireEvent.press(getByText(/candidate(s)/))
    it('folders page have a title', () => {
        async () => {
            const { container, getByText } = render(<FolderScreen />)
            await waitFor(() => {
                expect(getByText('My Folders')).toBeInTheDocument()
            }, { timeout: 3000 })
        }
    })

    it('folders are clickable', () => {
        async () => {
            const { container, getByText } = render(<FolderScreen />)
            await waitFor(() => {
                expect(getByText(' candidate(s)')).toBeVisible()
            }, { timeout: 3000 })
        }
    })

});
