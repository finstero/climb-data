import { combineReducers } from 'redux';

const allGraph = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALL_GRAPH':
            console.log('action.payload in all graph reducer', action.payload);
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    allGraph,
});