import SignIn from '../screens/sign-in';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

configure({
    adapter: new Adapter(),
});

describe('test for SignIn component', () => {
    const wrapper = shallow(<SignIn />);
    it('it should render', () => {
        expect(wrapper).toMatchSnapshot();
    });
});

describe('test for SignIn component', () => {
    const wrapper = shallow(<SignIn />);
    const instance = wrapper.instance();
    const loginClick = jest.spyOn(instance);
    wrapper.update();
    instance.forceUpdate();
    it('it should render with check func', () => {
        const email = wrapper.find(".email-login");
        const password = wrapper.find(".password-login");
        const loginClick = wrapper.find(".login-button");
        loginClick.simulate("click");
        expect(email !== "").toBeTruthy();
        expect(password !== "").toBeTruthy();
    });
});