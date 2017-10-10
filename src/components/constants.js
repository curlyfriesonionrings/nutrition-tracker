import imgBreakfast from '../assets/breakfast.jpeg';
import imgLunch from '../assets/lunch.jpeg';
import imgSnack from '../assets/snack.jpeg';
import imgDinner from '../assets/dinner.jpeg';

export const FOOD_TYPE_VEGETABLE = 'Vegetable';
const FOOD_TYPE_PROTEIN = 'Protein';
const FOOD_TYPE_FAT = 'Fat';
const FOOD_TYPE_CARB = 'Carbohydrate';
const FOOD_TYPE_DRINK = 'Drink';

export const FOOD_TYPES = [
    FOOD_TYPE_VEGETABLE,
    FOOD_TYPE_PROTEIN,
    FOOD_TYPE_FAT,
    FOOD_TYPE_CARB,
    FOOD_TYPE_DRINK
];

export const FOOD_LIMITS = {
    [FOOD_TYPE_PROTEIN]: 3,
    [FOOD_TYPE_FAT]: 2,
    [FOOD_TYPE_CARB]: 2
};

export const MEAL_TYPE_BREAKFAST = 'Breakfast';
const MEAL_TYPE_LUNCH = 'Lunch';
const MEAL_TYPE_SNACK = 'Snack';
const MEAL_TYPE_DINNER = 'Dinner';

export const MEAL_TYPES = [
    MEAL_TYPE_BREAKFAST,
    MEAL_TYPE_LUNCH,
    MEAL_TYPE_SNACK,
    MEAL_TYPE_DINNER
];

export const MEAL_TARGET = 6;

export const MEAL_DEFAULT_IMAGES = {
    [MEAL_TYPE_BREAKFAST]: imgBreakfast,
    [MEAL_TYPE_LUNCH]: imgLunch,
    [MEAL_TYPE_SNACK]: imgSnack,
    [MEAL_TYPE_DINNER]: imgDinner
}

// Pixels
export const MEAL_IMAGE_SIZE = 200;

export const TIME_FORMAT = 'MM/DD/YYYY';