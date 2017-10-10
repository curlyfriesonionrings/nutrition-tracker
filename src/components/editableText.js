import React from 'react';
import { Form, FormGroup, FormControl, Glyphicon } from 'react-bootstrap';

export class EditableText extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            input: this.props.defaultValue
        };

        this.toggleEditing = this.toggleEditing.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    toggleEditing(event) {
        if (this.state.editing) {
            // Submit input
            this.props.onSubmit(this.props.mealId, this.state.input);
            this.setState({editing: false});
        }
        else {
            this.setState({editing: true});
        }
    }

    handleInputChange(event) {
        this.setState({input: event.target.value});
    }

    render() {
        if (this.state.editing) {
            return (
                <Form inline>
                    <FormGroup controlId='editableInput'>
                        <FormControl name='editInput' value={this.state.input} onChange={this.handleInputChange} />
                    </FormGroup>
                    <Glyphicon className='editableTextIcon' glyph='ok' onClick={this.toggleEditing} />
                </Form>
            );
        } else {
            return (
                <div className={'editableText'}>
                    {this.state.input}
                    <Glyphicon className='editableTextIcon' glyph='pencil' onClick={this.toggleEditing} />
                </div>
            );
        }
    }
}

export default EditableText;