const filterReducer = (state = {}, action) => {
    // console.log('filterReducer', action.payload);
    switch (action.type) {
      case 'SET_GRAPH_FILTER_DISPLAY':
        return action.payload;
      default:
        return state;
    }
  };
  

  export default filterReducer;