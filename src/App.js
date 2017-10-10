import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { addFood, deleteFood } from './redux/modules/food';
import { addMeal, deleteMeal, renameMeal, changeMealImage } from './redux/modules/meal';
import { selectDay } from './redux/modules/day';
import { foods, meals, day, days } from './redux/selectors';
import { DaySelector, DayDisplay } from './components/day';
import { TIME_FORMAT } from './components/constants';

class App extends Component {
    render() {
        const {
            foods, meals, days, selectedDay,

            addFood, deleteFood, addMeal, deleteMeal, renameMeal, changeMealImage, selectDay
        } = this.props;

        const onDaySelect = (dayId) => {
            selectDay(dayId);
        };

        const editable = selectedDay.date === moment().format(TIME_FORMAT) ? true : false;

        return (
            <div>
                <DaySelector daySelect={onDaySelect} days={days} selectedDay={selectedDay} />

                <DayDisplay day={selectedDay} foods={foods} meals={meals}
                    addMeal={addMeal} deleteMeal={deleteMeal} renameMeal={renameMeal} changeMealImage={changeMealImage}
                    addFood={addFood} deleteFood={deleteFood}
                    editable={editable} />
            </div>
        );
    }
}

function stateToProps(state) {
    return {
        meals: meals(state),
        foods: foods(state, meals),
        selectedDay: day(state),
        days: days(state),
    };
}

const dispatchToProps = {
    addFood,
    deleteFood,
    addMeal,
    deleteMeal,
    renameMeal,
    changeMealImage,
    selectDay
};

export default connect(stateToProps, dispatchToProps)(App);