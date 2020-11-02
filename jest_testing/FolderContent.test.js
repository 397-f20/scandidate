import React from "react";
import renderer, { act } from "react-test-renderer";
import FolderContent from "../screens/FolderContents";
import { render, fireEvent } from '@testing-library/react-native'; 
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper"); //removes useNativeDriver error
configure({ adapter: new Adapter() });

const data = {
    params: {
      folder: ["CEO", [-1]]
    }
  }

describe('Folder Contents', () => {
    it('folder content renders', () => {
      async () => {
        render(<FolderContent />);
      }
    })

    jest.useFakeTimers();
    it("renders correctly", async () => {
        await shallow(<FolderContent route={data}/>);
    });

    it("show some contents", async () => {
        const wrapper =  shallow(<FolderContent route={data}/>);
        expect(wrapper.text()).toContain('ScrollView');

    });
})