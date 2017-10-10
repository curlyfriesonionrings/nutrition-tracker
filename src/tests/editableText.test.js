import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import EditableText from '../components/editableText';

const editTxt = mount(<EditableText defaultValue='Test' />);

describe('EditableText', () => {
    it('Text is displayed when editing state is false', () => {
        editTxt.setState({editing: false});

        expect(editTxt.find('div').text()).toEqual('Test');
    });

    it('Text is displayed when editing state is true', () => {
        editTxt.setState({editing: true});

        expect(editTxt.find('Form')).toBeDefined();
    });

    it('Action icon toggles editable state', () => {
        editTxt.setState({editing: false});
    
        const editBtn = editTxt.find('Glyphicon').first();
        editBtn.simulate('click');

        expect(editTxt.state('editing')).toBe(true);
    });

});