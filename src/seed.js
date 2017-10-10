import moment from 'moment';

import { TIME_FORMAT } from './components/constants';

export default function seedData(orm) {
    const state = orm.getEmptyState();

    const session = orm.mutableSession(state);

    const { Food, Meal, Day } = session;

    const day = Day.create({
        id: 0,
        date: moment().subtract(2, 'days').format(TIME_FORMAT)
    });
    const otherDay = Day.create({
        id: 1,
        date: moment().subtract(1, 'days').format(TIME_FORMAT)
    });

    Food.create({ type: 'Vegetable', servings: 4, meal: 2 });
    Food.create({ type: 'Fat', servings: 2, meal: 2 });
    Food.create({ type: 'Drink', servings: 4, meal: 2 });
    Food.create({ type: 'Carbohydrate', servings: 3, meal: 2 });
    Food.create({ type: 'Protein', servings: 6, meal: 2 });
    Food.create({ type: 'Drink', servings: 2, meal: 2 });

    Food.create({ type: 'Drink', servings: 1, meal: 1 });
    Food.create({ type: 'Fat', servings: 5, meal: 1 });
    Food.create({ type: 'Carbohydrate', servings: 2, meal: 1 });
    Food.create({ type: 'Vegetable', servings: 6, meal: 1 });
    Food.create({ type: 'Protein', servings: 1, meal: 1 });
    Food.create({ type: 'Drink', servings: 3, meal: 1 });

    Meal.create({
        id: 1,
        name: "meal 1",
        image: 'http://via.placeholder.com/150x150',
        day: day
    });
    Meal.create({
        id: 2,
        name: "meal 2",
        image: 'http://lorempixel.com/150/150',
        day: day
    });

    Food.create({ type: 'Drink', servings: 1, meal: 3 });
    Food.create({ type: 'Fat', servings: 2, meal: 3 });
    Food.create({ type: 'Vegetable', servings: 8, meal: 3 });
    Food.create({ type: 'Drink', servings: 6, meal: 3 });

    Meal.create({
        id: 3,
        name: "meal 3",
        image: 'https://placeimg.com/150/150/any',
        day: otherDay
    });

    Day.create({ id: 2, date: moment().format(TIME_FORMAT) });

    // Return the whole Redux initial state.
    return {
        orm: state,
        selectedDay: 2
    };
}