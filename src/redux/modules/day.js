import { attr, many, Model } from 'redux-orm';

export const SELECT_DAY = 'SELECT_DAY'

export const selectDay = (id) => {
    return {
        type: SELECT_DAY,
        payload: id,
    };
};

export class Day extends Model {}
Day.modelName = 'Day';

Day.fields = {
    id: attr(), // non-relational field for any value; optional but highly recommended
    date: attr(),
    meals: many('Meal', 'meals')
};

export default Day;