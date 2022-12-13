const ageRangeReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_AGE_RANGES':
        return action.payload;
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default ageRangeReducer;