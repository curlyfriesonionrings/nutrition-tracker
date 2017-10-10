import { ORM } from 'redux-orm';

import Food from './modules/food';
import Meal from './modules/meal';
import Day from './modules/day';

export const orm = new ORM();
orm.register(Food, Meal, Day);

export default orm;