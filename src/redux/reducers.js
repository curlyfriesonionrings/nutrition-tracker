import { SELECT_DAY } from './modules/day';

export function selectedDayReducer(state = 0, action) {
    const { type, payload } = action;
    switch (type) {
        case SELECT_DAY:
            return payload;
        default:
            return state;
    }
}