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

// stores all routes for user
const allRoutes = (state = [], action) => {
    switch(action.type) {
        case 'SET_ALL_ROUTES':
            return action.payload;
        case 'CLEAR_ALL_ROUTES':
            return [];
        default:
            return state;
    }
}

// stores route clicked on in RouteList by user
const oneRoute = (state = {}, action) => {
    switch(action.type) {
        case 'SET_ONE_ROUTE':
            console.log('action.payload in oneRoute reducer', action.payload);
            return action.payload[0];
        default:
            return state;
    } 
}

export default combineReducers({
    latestRoute,
    allRoutes,
    oneRoute,
});