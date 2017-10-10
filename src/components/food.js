import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button, Glyphicon } from 'react-bootstrap';

import { FOOD_TYPES, FOOD_TYPE_VEGETABLE } from './constants.js';

export class AddFoodItem extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            foodType: FOOD_TYPE_VEGETABLE,
            servings: 1
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.name === 'servings' ? parseInt(target.value, 10) : target.value;

        this.setState({
            [name]: value
        });
    }

    onSubmit(event) {
        this.props.addItem(this.props.mealId, this.state.foodType, this.state.servings);

        // Reset form
        this.setState({
            foodType: FOOD_TYPE_VEGETABLE,
            servings: 1
        })
    }

    submitHandler(e) {
        // Stop enter key from traditional web submission
        e.preventDefault();

        this.onSubmit(e);
    }

    render() {
        const foodTypeSelections = FOOD_TYPES.map(foodType => {
            return { value: foodType, label: foodType }
        });

        const foodOptions = foodTypeSelections.map((opt, index) => {
            return <option key={index} value={opt.value}>{opt.label}</option>
        });

        let servingFormProps = {
            controlId: 'formServings'
        }

        let buttonProps = {
            bsStyle: 'success',
            onClick: this.onSubmit
        }

        // Add error case if situation requires
        if (this.state.servings < 1) {
            servingFormProps['validationState'] = 'error';
            buttonProps['disabled'] = true;
        }

        return (
            <Form inline onSubmit={this.submitHandler}>
                <FormGroup controlId='formType'>
                    <ControlLabel>Food Type</ControlLabel>
                    {' '}
                    <FormControl name='foodType' componentClass='select' placeholder='Food Type' value={this.state.foodType} onChange={this.handleInputChange}>
                        { foodOptions }
                    </FormControl>
                </FormGroup>
                <FormGroup {...servingFormProps}>
                    <ControlLabel>Servings</ControlLabel> {' '}
                    <FormControl name='servings' type='number' placeholder='Servings' value={this.state.servings} min={1}
                        onChange={this.handleInputChange} />
                    <FormControl.Feedback />
                </FormGroup>
                <Button {...buttonProps}>
                    <Glyphicon glyph='plus' />
                </Button>
            </Form>
        );
    }
}

export default AddFoodItem;