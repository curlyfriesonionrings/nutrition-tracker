import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { createReducer } from 'redux-orm';

import './index.css';
import { orm } from './redux/orm';
import { selectedDayReducer } from './redux/reducers';
import seedData from './seed';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const rootReducer = combineReducers({
    orm: createReducer(orm),
    selectedDay: selectedDayReducer,
});

const store = createStore(rootReducer, seedData(orm));

ReactDOM.render((
    <Provider store={store}>
        <App />
    </Provider>
    ), document.getElementById("root"));
registerServiceWorker();