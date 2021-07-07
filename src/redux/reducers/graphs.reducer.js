import { combineReducers } from 'redux';

const allGraph = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALL_GRAPH':
            console.log('action.payload in all graph reducer', action.payload);
            return action.payload;
        case 'SET_FILTERED_GRAPH':
            console.log('filter reducer', action.payload);
            console.log('filter reducer state', state);
            const filteredArray = state.filter(route => route.sent != action.payload.sent)
            console.log('filtered array', filteredArray);
            return filteredArray;
        // case 'SET_SEND_FILTER':
        //     console.log('SET SEND FILTER', state);
        //     const filteredArray = state.filter(route => route.id != 1)
        //     console.log('filtered array', filteredArray);
        //     return filteredArray;
        case 'CLEAR_ALL_GRAPH':
            return [];
        default:
            return state;
    }
}

export default combineReducers({
    allGraph,
});