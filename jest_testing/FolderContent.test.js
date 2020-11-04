import React from "react";
import renderer, { act } from "react-test-renderer";
import FolderContent from "../screens/FolderContents";
import { CandidateCard } from "../components/CandidateCard";
import { render, fireEvent } from '@testing-library/react-native';
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure, mount, ReactWrapper } from "enzyme";

configure({ adapter: new Adapter() });

jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper"); //removes useNativeDriver error

const data = {
    params: {
        folder: ["CEO", [-1]]
    }
}
const data2 = {
    params: {
        folder: ["DA", [-1, 101, 102]]
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
        await shallow(<FolderContent route={data} />);
    });
})


describe('Folder Content Structures', () => {
    jest.useFakeTimers();
    it("show some contents", async () => {
        const wrapper = shallow(<FolderContent route={data} />);
        expect(wrapper.text()).toContain('ScrollView');
    });
})


describe('Folder Content Details', () => {
    jest.useFakeTimers();
    let folderContent;
    beforeEach(() => {
        folderContent = shallow(<FolderContent route={data2} />);
    });

    it("show contents", async () => {
        expect(folderContent.find("Header").text()).toContain('Header');
    });

    it("has correct children", async () => {
        const screen = renderer.create(<FolderContent route={data2} />)
        const tree = screen.toJSON();
        const treeStr = JSON.stringify(tree);
        expect(tree.children.length).toBe(1);
        expect(treeStr).toContain("DA")
    });
})

