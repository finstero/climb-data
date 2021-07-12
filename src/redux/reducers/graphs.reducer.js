import { combineReducers } from 'redux';

const allGraph = (state = [], action) => {
    
    switch (action.type) {
        case 'SET_ALL_GRAPH':
            console.log('state in allGraph', state);
            console.log('action.payload in all graph reducer', action.payload);
            return action.payload
        // case 'SET_FILTERED_GRAPH':
        //     console.log('filter reducer', action.payload);
        //     console.log('filter reducer state', state);
        //     const filteredArray = state.filter(route => route.sent != action.payload.sent)
        //     console.log('filtered array', filteredArray);
        //     return filteredArray;
        case 'CLEAR_ALL_GRAPH':
            return [];
        default:
            return state;
    }
}

const overlay = (state = [], action) => {
    switch(action.type) {
        case 'SET_OVERLAY_GRAPH':
            return action.payload;
        case 'CLEAR_OVERLAY_GRAPH':
            return [];
        default:
            return state;
    }
}

const overlayExists = (state = {}, action) => {
    switch(action.type) {
        case 'SET_OVERLAY_TRUE':
            return {...state, status: true};
        case 'SET_OVERLAY_FALSE':
            return {};
        default:
            return state;
    }
}

export default combineReducers({
    allGraph,
    overlay,
    overlayExists,
});