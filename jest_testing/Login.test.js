import React from "react";
import { Button, Text, TextInput, } from "react-native";
import renderer, { act } from "react-test-renderer";
import LoginScreen from "../screens/LoginScreen";
import { render, fireEvent } from '@testing-library/react-native';
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure, mount, ReactWrapper } from "enzyme";
configure({ adapter: new Adapter() });
jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper"); //removes useNativeDriver error

describe('login page renders', () => {
    it('login page renders and contains some info', () => {
        async () => {
            const { container, getByText } = render(<LoginScreen />)
            await waitFor(() => {
                expect(getByText('Login')).toBeInTheDocument()
            }, { timeout: 3000 })
        }
    })
});

describe('all component renders', () => {
    it('should render textinput', () => {
        const wrapper = shallow(<LoginScreen />);
        expect(wrapper.find(TextInput).length).toEqual(2);
    })
    it('should render login button', () => {
        const wrapper = shallow(<LoginScreen />);
        expect(wrapper.find(Button).length).toEqual(1);
    })
});

describe('all component renders with correct prop', () => {
    const initialProps = {
        email: 'admin',
        password: '123321',
    };
    const container = shallow(<LoginScreen {...initialProps} />);

    it('should render correct email field', () => {
        expect(container.find(TextInput).first().props()).toHaveProperty(
            'placeholder', 'Email');
    })

    it('should render correct password field', () => {
        expect(container.find(TextInput).at(1).props()).toHaveProperty(
            'placeholder', 'Password');
        expect(container.find(TextInput).at(1).props()).toHaveProperty(
            'secureTextEntry', true);
    })

});

describe('error when email is not in email format', () => {
    const initialProps = {
        email: 'admin',
        password: '123321',
    };
    const container = shallow(<LoginScreen {...initialProps} />);
    // const mySpy = new MySpy();
    // const mockCallBack = mySpy.fn();

    beforeEach(() => {
        container.find(TextInput).first().simulate('change', {target: {value: 'admin'}});
        container.find(TextInput).at(1).simulate('change', {target: {value: '123321'}});
        container.find(Button).at(0).simulate('press')
        //todo...
        container.find(TextInput).first().props().value = "admin"
        container.find(TextInput).at(1).props().value = "123"
        container.find(Button).at(0).props().onPress()
        container.update();
    });

    // it('should the button being pressed', () => {
    //     const mockOnClick = jest.fn();
    //     const wrapper = shallow(<LoginScreen onPress={mockOnClick} />)
    //     wrapper.find(Button).at(0).simulate('press', 'junk')
    //     expect(mockOnClick.mock.calls.length).toEqual(0) //i tried....
    // })

    it('should the error msg being returned', () => {
        container.find(Button).at(0).props().onPress()
        async () => {
            expect(container.update().find(Button).at(0).props()).toHaveProperty("onPress")
            // expect(container.update().find(TextInput).at(0).props().value).toBe("admin")
            expect(container.update().find(Text).at(2).dive().text()).toBe(
                "The email address is badly formatted.");
        }
    })
});
