import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import { DaySelector, DaySummary, DayDisplay } from '../components/day';
import { MEAL_TARGET } from '../components/constants';

describe('DaySelector', () => {
    const days = [
        { id: 2, date: "date_1" },
        { id: 3, date: "date_2" },
        { id: 4, date: "date_3" }
    ]

    it('Previous button is disabled when viewing the first day', () => {
        const selectedDay = days[0];

        const wrapper = mount(<DaySelector days={days} selectedDay={selectedDay} />);

        expect(wrapper.find('Button').first().instance().props.disabled).toBe(true);
    });

    it('Next button is disabled when viewing the last day', () => {
        const selectedDay = days[days.length - 1];
        
        const wrapper = mount(<DaySelector days={days} selectedDay={selectedDay} />);

        expect(wrapper.find('Button').last().instance().props.disabled).toBe(true);
    });
});

describe('DaySummary', () => {
    it('Progress for meals is capped at MEAL_TARGET', () => {
        const meals = [
            { id: 0, name: "dummy 1", day: 1 }, { id: 1, name: "dummy 2", day: 1 },
            { id: 2, name: "dummy 3", day: 1 }, { id: 3, name: "dummy 4", day: 1 },
            { id: 4, name: "dummy 5", day: 1 }, { id: 5, name: "dummy 6", day: 1 },
            { id: 6, name: "dummy 7", day: 1 }, { id: 7, name: "dummy 8", day: 1 }
        ]

        const expected = MEAL_TARGET.toString() + ' / ' + MEAL_TARGET.toString();

        const wrapper = mount(<DaySummary foods={[]} meals={meals} />);

        expect(wrapper.find('ProgressBar').first().instance().props.label).toEqual(expected);
    });

    it('Progress bar shows with "danger" class if number of meals < MEAL_TARGET', () => {
        const meals = [
            { id: 0, name: "dummy 1", day: 1 }
        ]

        const wrapper = mount(<DaySummary foods={[]} meals={meals} />);

        expect(wrapper.find('ProgressBar').first().instance().props.bsStyle).toEqual('danger');
    });

    it('Progress bar shows with "success" class if number of meals === MEAL_TARGET', () => {
        const meals = [
            { id: 0, name: "dummy 1", day: 1 }, { id: 1, name: "dummy 2", day: 1 },
            { id: 2, name: "dummy 3", day: 1 }, { id: 3, name: "dummy 4", day: 1 },
            { id: 4, name: "dummy 5", day: 1 }, { id: 5, name: "dummy 6", day: 1 }
        ]

        const wrapper = mount(<DaySummary foods={[]} meals={meals} />);

        expect(wrapper.find('ProgressBar').first().instance().props.bsStyle).toEqual('success');
    });
});

describe('DayDisplay', () => {
    it('Does not show AddMealItem if editable property is false', () => {
        const wrapper = mount(<DayDisplay foods={[]} meals={[]} editable={false} />)

        expect(wrapper.find('AddMealItem').exists()).toBe(false);
    })
});