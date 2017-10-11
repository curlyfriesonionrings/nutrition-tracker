This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Demo can be seen [here](https://curlyfriesonionrings.github.io/nutrition-tracker)

This project utilizes React, Redux, and [Redux-ORM](https://github.com/tommikaikkonen/redux-orm) to create a brief demonstration of a nutritional diary use case.

The following "specifications" were used as a guideline for creating this app:
>As a user, I want to be able to enter information about what I'm eating in order to track my food habits.
>1. A day should ideally have 6 meals. The user can view meals entered for today, or view a past day's meals.
>2. The user can enter a new meal
>3. A meal can contain a number of servings of six types:
>	-Vegetable
>	-Protein
>	-Fat
>	-Carb
>	-Drink
>4. A meal can have a custom name, or use the default name
>	Default names are 'Breakfast', 'Lunch', 'Dinner', 'Snack'
>5. A user can upload an image of their meal, or use a default image for the meal
>6. There should be a summary of progress toward the day's food goals
>	Food goals:
>		-6 meals entered
>		-Food servings: 6 Veg, 3 Protein, 2 fat, 2 carb, 8 drink
>		-Negative feedback should be given for going over the limit for protein, fat, and carb

There is no persistent storage of any kind, but due to the data modeling as a result of using Redux-ORM, adding a database to store data is trivial.
