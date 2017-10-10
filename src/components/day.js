import React from 'react';
import { Button, Glyphicon, Panel, Col, ProgressBar, Tooltip, OverlayTrigger } from 'react-bootstrap';

import { SummaryTable } from './summaryTable';
import { MealDisplay, AddMealItem } from './meal';
import { MEAL_TARGET } from './constants';

export class DaySelector extends React.Component {
    // Use indexes to traverse day data for continuity in "previous" and "next" patterns
    constructor(props) {
        super(props);

        // Get current selectedDay index in the list of valid day entries
        let dayIndex = props.days.map(day => { return day.id; }).indexOf(props.selectedDay.id);

        this.state = {
            currentDayIndex: dayIndex
        }

        this.changeDay = this.changeDay.bind(this);
    }
        
    changeDay(event) {
        const props = this.props;

        const target = event.currentTarget;
        const name = target.name;

        switch (name) {
            case 'previous':
                const prevIndex = this.state.currentDayIndex - 1;
                if (prevIndex >= 0) {
                    this.setState({currentDayIndex: prevIndex});
                }
                props.daySelect(props.days[prevIndex].id);
                break;
            case 'next':
                const nextIndex = this.state.currentDayIndex + 1;
                if (nextIndex < props.days.length) {
                    this.setState({currentDayIndex: nextIndex});
                }
                props.daySelect(props.days[nextIndex].id);
                break;
            default:
                console.log("Unknown event received in DaySelector");
                break;
        }
    }

    render() {
        const props = this.props;

        let prevButtonProps = {
            name: 'previous',
            onClick: this.changeDay
        };

        let nextButtonProps = {
            name: 'next',
            onClick: this.changeDay
        };

        const curIndex = this.state.currentDayIndex;

        // Limit day traversal
        if (curIndex - 1 < 0) {
            prevButtonProps['disabled'] = true;
        }
        if (curIndex + 1 > props.days.length - 1) {
            nextButtonProps['disabled'] = true;
        }

        return (
            <div>
                <Button {...prevButtonProps}>
                    <Glyphicon glyph='menu-left' />
                </Button>
                {props.selectedDay.date}
                <Button {...nextButtonProps}>
                    <Glyphicon glyph='menu-right' />
                </Button>
            </div>
        );
    }
}

export class DaySummary extends React.PureComponent {
    render() {
        const props = this.props;

        // Amalgamate foods into an array for the day summary
        let dayFoods = [];
        for (let mealId in props.foods) {
            dayFoods = dayFoods.concat(props.foods[mealId]);
        }

        const curProg = props.meals.length > MEAL_TARGET ? MEAL_TARGET : props.meals.length;
        
        let style, tooltip;
        if (curProg < MEAL_TARGET) {
            style = 'danger';
            tooltip = <Tooltip id='tooltip'>The recommendation is {MEAL_TARGET.toString()} meals a day</Tooltip>;
        }
        else {
            style = 'success';
            tooltip = <Tooltip id='tooltip'>Congrats! You've reached the meal target!</Tooltip>;
        }

        return (
            <div>
                <Col xs={8}>
                    <SummaryTable foods={dayFoods} statusReport={true} />
                </Col>
                <Col xs={12}>
                    <strong>Meal Goals</strong>
                    <OverlayTrigger placement='top' overlay={tooltip}>
                        <ProgressBar min={0} max={MEAL_TARGET} now={curProg} bsStyle={style}
                            label={curProg.toString() + ' / ' + MEAL_TARGET.toString()} />
                    </OverlayTrigger>
                </Col>
            </div>
        );
    }
}

export class DayDisplay extends React.PureComponent {
    render() {
        const {
            day, foods, meals, deleteMeal, renameMeal, addFood, deleteFood, addMeal, changeMealImage, editable
        } = this.props;

        const mealDisplay = (
            meals.map(meal => {
                return (
                <Col xs={12} md={6} key={meal.id}>
                    <Panel key={meal.id}>
                        <MealDisplay foods={foods[meal.id]} meal={meal}
                            deleteMeal={deleteMeal} renameMeal={renameMeal} changeMealImage={changeMealImage}
                            addFood={addFood} deleteFood={deleteFood}
                            editable={editable} />
                    </Panel>
                </Col>
                );
            })
        )

        if (editable) {
            return (
                <div>
                    <DaySummary foods={foods} meals={meals} />
                    {mealDisplay}
    
                    <Col xs={12}>
                        <AddMealItem day={day} addItem={addMeal} />
                    </Col>
                </div>
            );
        }

        return (
            <div>
                <DaySummary foods={foods} meals={meals} />
                {mealDisplay}
            </div>
        );
    }
}