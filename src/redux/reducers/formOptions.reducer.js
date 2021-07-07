import { combineReducers } from 'redux';

// stores grades of one grade type
const gradesReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_GRADES':
            return action.payload;
        default:
            return state;
    }
}

const ropeReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_ROPES':
            return action.payload;
        default:
            return state;
    }
}

const wallReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_WALLS':
            return action.payload;
        default:
            return state;
    }
}

const holdReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_HOLDS':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    gradesReducer,
    ropeReducer,
    wallReducer,
    holdReducer,
});