import { fk, attr, Model } from 'redux-orm';

export const ADD_FOOD = 'ADD_FOOD'
export const DELETE_FOOD = 'DELETE_FOOD'

export const addFood = (mealId, type, servings) => {
    return {
        type: ADD_FOOD,
        payload: {
            mealId,
            type,
            servings,
        }
    };
}

export const deleteFood = (foodId) => {
    return {
        type: DELETE_FOOD,
        payload: foodId
    };
}

export class Food extends Model {
    static reducer(action, Food) {
        const { payload, type } = action;
        switch (type) {
            case ADD_FOOD:
                Food.create({ meal: payload.mealId, type: payload.type, servings: payload.servings });
                break;
            case DELETE_FOOD:
                Food.withId(payload).delete();
                break;
            // Handle Delete meal as well
            default:
                break;
        }
    }
}
Food.modelName = 'Food';

Food.fields = {
    id: attr(), // non-relational field for any value; optional but highly recommended
    meal: fk('Meal', 'meal')
};

export default Food;