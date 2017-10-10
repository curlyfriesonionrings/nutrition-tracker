import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import AddFoodItem from '../components/food';

describe('AddFoodItem', () => {
    const props = { addItem: jest.fn() }
    const wrapper = mount(<AddFoodItem {...props} />)

    it('Add button is bound', () => {
        let btn = wrapper.find('Button').first();
        btn.simulate('click');
        expect(props.addItem.mock.calls.length).toBe(1);
    });

    it('Form is reset after clicking button', () => {
        let btn = wrapper.find('Button').first();
        btn.simulate('click');
        
        expect(wrapper.state('foodType')).toEqual('Vegetable');
        expect(wrapper.state('servings')).toBe(1);
    });

    it('Form shows error if servings <= 0', () => {
        wrapper.setState({servings: -1});
        
        expect(wrapper.find({ validationState: 'error' }).length).toBe(1);
    });

    it('Form disabled submit button if servings <= 0', () => {
        wrapper.setState({servings: -1});
        
        expect(wrapper.find('Button').instance().props.disabled).toBe(true);
    });

});