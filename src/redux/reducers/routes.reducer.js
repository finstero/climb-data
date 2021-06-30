import { combineReducers } from 'redux';

// stores last route added by user
const latestRoute = (state = [], action) => {
    switch(action.type) {
        case 'SET_LATEST_ROUTE':
            return action.payload;
        default:
            return state;
    }
}

const allRoutes = (state = [], action) => {
    switch(action.type) {
        case 'SET_ALL_ROUTES':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    latestRoute,
    allRoutes,
});