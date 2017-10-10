import React from 'react';
import {
    Panel, Table, Button, Glyphicon, Media, Form, FormGroup, ControlLabel,
    FormControl, Modal, Tooltip, OverlayTrigger, Image
} from 'react-bootstrap';

import { MEAL_TYPES, MEAL_TYPE_BREAKFAST, MEAL_DEFAULT_IMAGES, MEAL_IMAGE_SIZE } from './constants';
import AddFoodItem from './food';
import EditableText from './editableText';
import SummaryTable from './summaryTable';

export class MealDetails extends React.PureComponent {
    render() {
        const props = this.props;

        // Empty header for column that contains row actions (if editable)
        const columns = props.editable ? ['Food Type', 'Number of Servings', ''] : ['Food Type', 'Number of Servings'];
        const header =
            <thead>
                <tr>
                    {columns.map((col, index) => {
                        return <th key={index}>{col}</th>
                    })}
                </tr>
            </thead>;

        if (props.editable) {
            return (
                <Panel collapsible header='Details'>
                    <Table condensed>
                        { header }
                        <tbody>{
                            props.foods.map(food => {
                                return (
                                    <tr key={food.id}>
                                        <td>{food.type}</td>
                                        <td>{food.servings}</td>
                                        <td>
                                            <Button bsStyle='danger' type='submit' onClick={props.removeItem.bind(null, food.id)}>
                                                <Glyphicon glyph='remove' />
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                    <AddFoodItem addItem={props.addItem} mealId={props.mealId} />
                </Panel>
            );
        }

        return (
            <Panel collapsible header='Details'>
                <Table condensed>
                    { header }
                    <tbody>{
                        props.foods.map(food => {
                            return (
                                <tr key={food.id}>
                                    <td>{food.type}</td>
                                    <td>{food.servings}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Panel>
        );
    }
}

export class MealDisplay extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            showingDeleteModal: false,
            showingImageModal: false
        }
    }

    render() {
        const {
            foods, meal, deleteMeal, renameMeal, addFood, deleteFood, changeMealImage, editable
        } = this.props;

        if (editable) {
            const closeDeleteModal = () => this.setState({ showingDeleteModal: false });
            const closeImageModal = () => this.setState({ showingImageModal: false });

            const deleteModalProps = {
                modalProps: {
                    show: this.state.showingDeleteModal,
                    onHide: closeDeleteModal
                },
                mealName: meal.name,
                mealId: meal.id,
                deleteMeal: deleteMeal
            }

            const imageModalProps = {
                modalProps: {
                    show: this.state.showingImageModal,
                    onHide: closeImageModal
                },
                changeMealImage: changeMealImage,
                mealId: meal.id
            }
            
            const tooltip = (
                <Tooltip id='tooltip'>Click to change image</Tooltip>
            );

            return (
                <Media>
                    <div className={'topbar'}>
                        <Glyphicon className={'icon-topbar'} glyph='remove' onClick={()=>this.setState({ showingDeleteModal: true })} />
                        <ConfirmDeleteModal {...deleteModalProps} />
                    </div>
                    <Media.Heading>
                        <EditableText defaultValue={meal.name} onSubmit={renameMeal} mealId={meal.id}/>
                    </Media.Heading>
                    <Media.Left align='middle'>
                        <OverlayTrigger placement='bottom' overlay={tooltip}>
                            <Image className='media-image' src={meal.image} alt={meal.name} title={meal.name} width={MEAL_IMAGE_SIZE} height={MEAL_IMAGE_SIZE}
                                onClick={()=>this.setState({ showingImageModal: true })} />
                        </OverlayTrigger>
                        <ImageModal {...imageModalProps} />
                    </Media.Left>
                    <Media.Body>
                        <SummaryTable foods={foods} />
                    </Media.Body>

                    <MealDetails foods={foods} addItem={addFood} removeItem={deleteFood} mealId={meal.id} editable={editable}/>
                </Media>
            );
        }

        return (
            <Media>
                <Media.Heading>
                    {meal.name}
                </Media.Heading>
                <Media.Left align='middle'>
                    <Image src={meal.image} alt={meal.name} title={meal.name} width={MEAL_IMAGE_SIZE} height={MEAL_IMAGE_SIZE} />
                </Media.Left>
                <Media.Body>
                    <SummaryTable foods={foods} />
                </Media.Body>

                <MealDetails foods={foods} addItem={addFood} removeItem={deleteFood} mealId={meal.id} editable={editable}/>
            </Media>
        )
    }
}

export class AddMealItem extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            mealType: MEAL_TYPE_BREAKFAST,
            name: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        });
    }

    onSubmit(event) {
        // Blank names default to meal type
        let name = this.state.name;
        if (name.trim().length === 0) {
            name = this.state.mealType;
        }

        this.props.addItem(this.props.day.id, MEAL_DEFAULT_IMAGES[this.state.mealType], name);

        // Reset form
        this.setState({
            mealType: MEAL_TYPE_BREAKFAST,
            name: ''
        })
    }

    submitHandler(e) {
        // Stop enter key from traditional web submission
        e.preventDefault();

        this.onSubmit(e);
    }

    render() {
        const mealTypeSelections = MEAL_TYPES.map(mealType => {
            return { value: mealType, label: mealType }
        });

        const mealTypeOptions = mealTypeSelections.map((opt, index) => {
            return <option key={index} value={opt.value}>{opt.label}</option>
        });

        return (
            <Form inline onSubmit={this.submitHandler}>
                <FormGroup controlId='formType'>
                    <ControlLabel>Meal Type</ControlLabel>
                    {' '}
                    <FormControl name='mealType' componentClass='select' placeholder='Meal Type' value={this.state.mealType} onChange={this.handleInputChange}>
                        { mealTypeOptions }
                    </FormControl>
                </FormGroup>
                <FormGroup controlId='formName'>
                    <ControlLabel>Name</ControlLabel> {' '}
                    <FormControl name='name' placeholder='Optional' value={this.state.name} onChange={this.handleInputChange} />
                </FormGroup>
                <Button bsStyle='success' onClick={this.onSubmit}>
                    <Glyphicon glyph='plus' />
                </Button>
            </Form>
        );
    }
}

class ConfirmDeleteModal extends React.PureComponent {
    render () {
        const props = this.props;
        return (
            <Modal {...props.modalProps}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>You are about to delete meal "{props.mealName}". This process is irreversible!</p>
                    <p>Are you sure you want to delete this meal?</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={props.modalProps.onHide}>Cancel</Button>
                    <Button bsStyle='danger' onClick={props.deleteMeal.bind(null, props.mealId)}>Delete</Button>
                </Modal.Footer>

            </Modal>
        );
    }
}

class ImageModal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            input: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    handleInputChange(event) {
        this.setState({input: event.target.value});
    }

    onSubmit(event) {
        const props = this.props;

        props.changeMealImage(props.mealId, this.state.input);

        this.setState({input: ''});
        props.modalProps.onHide();
    }

    submitHandler(e) {
        e.preventDefault();

        this.onSubmit(e);
    }

    render () {
        const props = this.props;

        return (
            <Modal {...props.modalProps}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter Image URL</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Enter the URL of a publicly accessible image</p>
                    <Form onSubmit={this.submitHandler}>
                        <FormGroup controlId='imageInput'>
                            <FormControl name='editInput' placeholder='Image URL goes here' value={this.state.input} onChange={this.handleInputChange} />
                        </FormGroup>
                    </Form>
                    <em className='text-muted'>Due to lack of storage, uploading an image will not be possible</em>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={props.modalProps.onHide}>Cancel</Button>
                    <Button bsStyle='primary' onClick={this.onSubmit}>Done</Button>
                </Modal.Footer>

            </Modal>
        );
    }
}