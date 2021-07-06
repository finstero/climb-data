import { combineReducers } from 'redux';

const allGraph = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALL_GRAPH':
            console.log('action.payload in all graph reducer', action.payload);
            return action.payload;
        case 'CLEAR_ALL_GRAPH':
            return [];
        default:
            return state;
    }
}

export default combineReducers({
    allGraph,
});