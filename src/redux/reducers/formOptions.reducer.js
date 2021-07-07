import { combineReducers } from 'redux';

// stores grades of one grade type
const ropesReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_ROPES':
            return action.payload;
        default:
            return state;
    }
}

const gradesReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_GRADES':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    gradesReducer,
    ropesReducer,
});