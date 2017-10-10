import { orm } from './orm';
import { createSelector } from 'reselect';
import { createSelector as ormCreateSelector } from 'redux-orm';

export const ormSelector = state => state.orm;

export const meals = createSelector(
    ormSelector,
    state => state.selectedDay,
    ormCreateSelector(orm, (session, dayId) => {
        return session.Meal.filter({ day: dayId }).toRefArray();
    })
);

// Returns an object with meal ids as keys and food lists as values
export const foods = createSelector(
    ormSelector,
    meals,
    ormCreateSelector(orm, (session, meals) => {
        let ret = {};

        for (let m of meals) {
            ret[m.id] = session.Food.filter({ meal: m.id }).toRefArray();
        }

        return ret;
    })
);

export const day = createSelector(
    ormSelector,
    state => state.selectedDay,
    ormCreateSelector(orm, (session, selectedDay) => {
        return session.Day.withId(selectedDay).ref;
    })
);

export const days = createSelector(
    ormSelector,
    ormCreateSelector(orm, session => {
        return session.Day.all().toRefArray();
    })
);