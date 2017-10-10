import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import { SummaryTable } from '../components/summaryTable';

describe('SummaryTable', () => {
    it('Adds food type servings for each food type properly', () => {
        const foods = [
            { id:0, type: 'Vegetable', servings: 1}, { id:1, type: 'Protein', servings: 2},
            { id:2, type: 'Fat', servings: 3}, { id:3, type: 'Carbohydrate', servings: 4},
            { id:4, type: 'Drink', servings: 5}, { id:5, type: 'Vegetable', servings: 5},
            { id:6, type: 'Protein', servings: 4}, { id:7, type: 'Fat', servings: 3},
            { id:8, type: 'Carbohydrate', servings: 2}, { id:9, type: 'Drink', servings: 1}
        ]
        
        const sums = {
            'Vegetable': 6, 'Protein': 6, 'Fat': 6, 'Carbohydrate': 6, 'Drink': 6
        }

        const wrapper = mount(<SummaryTable foods={foods} />);

        expect(wrapper.instance().getTotalServings()).toEqual(sums);
    });
});