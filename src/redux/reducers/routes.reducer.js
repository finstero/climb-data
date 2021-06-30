import { combineReducers } from 'redux';


const latestRoute = (state = [], action) => {
    switch(action.type) {
        case 'SET_LATEST_ROUTE':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    latestRoute,
});