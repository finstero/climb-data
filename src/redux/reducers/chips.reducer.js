const selectedRope = (state = [], action) => {
    switch (action.type) {
      case 'ADD_ROPE':
        return [...state, action.payload];
      case 'DELETE_ROPE':
        return [];
      default:
        return state;
    }
  };

  export default selectedRope;