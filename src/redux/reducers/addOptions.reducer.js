import { combineReducers } from 'redux';


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
});