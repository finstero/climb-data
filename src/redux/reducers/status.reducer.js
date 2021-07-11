const statusReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_ALERT_TRUE':
            return {status: true};
        case 'SET_ALERT_FALSE':
            return {status: false};
        default:
            return {status: false};
    }
};


export default statusReducer;