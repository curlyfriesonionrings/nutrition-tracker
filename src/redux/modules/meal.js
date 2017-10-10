import { fk, attr, Model } from 'redux-orm';

const ADD_MEAL = 'ADD_MEAL';
const DELETE_MEAL = 'DELETE_MEAL';
const RENAME_MEAL = 'RENAME_MEAL';
const CHANGE_IMG_MEAL = 'CHANGE_IMG_MEAL';

export const addMeal = (day, imagePath, name) => {
    return {
        type: ADD_MEAL,
        payload: {
            day,
            imagePath,
            name
        }
    }
}

export const deleteMeal = (mealId) => {
    return {
        type: DELETE_MEAL,
        payload: mealId
    }
}

export const renameMeal = (mealId, name) => {
    return {
        type: RENAME_MEAL,
        payload: {
            mealId,
            name
        }
    }
}

export const changeMealImage = (mealId, imagePath) => {
    return {
        type: CHANGE_IMG_MEAL,
        payload: {
            mealId,
            imagePath
        }
    }
}

export class Meal extends Model {
    static reducer(action, Meal, session) {
        const { payload, type } = action;
        switch (type) {
            case ADD_MEAL:
                Meal.create({ day: payload.day, image: payload.imagePath, name: payload.name });
                break;
            case DELETE_MEAL:
                Meal.withId(payload).delete();
                // Redux-ORM handles deletion of Foods with this meal id as a foreign key as well
                break;
            case RENAME_MEAL:
                Meal.withId(payload.mealId).update({name: payload.name});
                break;
            case CHANGE_IMG_MEAL:
                Meal.withId(payload.mealId).update({image: payload.imagePath})
                break;
            default:
                break;
        }
    }
}
Meal.modelName = 'Meal';

Meal.fields = {
    id: attr(),
    name: attr(),
    image: attr(),
    day: fk('Day', 'day')
};

export default Meal;