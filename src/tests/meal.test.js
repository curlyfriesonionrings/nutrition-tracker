import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import { MealDisplay, MealDetails } from '../components/meal';

describe('MealDisplay', () => {
    const meal = {
        id: 0,
        name: "Dummy Meal",
        image: 'http://lorempixel.com/150/150',
        day: 0
    }

    const wrapper = mount(<MealDisplay foods={[]} meal={meal} editable={false} />)

    it('Modals are not included if editable property is false', () => {
        expect(wrapper.find('ConfirmDeleteModal').exists()).toBe(false);
        expect(wrapper.find('ImageModal').exists()).toBe(false);
    })

    it('Overlay tooltips are not included if editable property is false', () => {
        expect(wrapper.find('OverlayTrigger').exists()).toBe(false);
    })

    it('Delete glyph does not exist if editable property is false', () => {
        expect(wrapper.find('.topbar').exists()).toBe(false);
    });

    it('Meal name is not editable if editable property is false', () => {
        expect(wrapper.find('EditableText').exists()).toBe(false);
    });
})

describe('MealDetails', () => {
    const foods = [
        { id:0, type: 'Vegetable', servings: 3},
        { id:1, type: 'Protein', servings: 2},
        { id:2, type: 'Fat', servings: 1}
    ]

    const wrapper = mount(<MealDetails foods={foods} editable={false} />)

    it('Delete buttons for foods are not included if editable property is false', () => {
        expect(wrapper.find('Button').exists()).toBe(false);
    });

    it('Does not show AddFoodItem if editable property is false', () => {
        expect(wrapper.find('AddFoodItem').exists()).toBe(false);
    })
})