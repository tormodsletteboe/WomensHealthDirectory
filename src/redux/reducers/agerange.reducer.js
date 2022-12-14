const ageRanges = (state = [], action) => {
    switch (action.type) {
      case 'SET_AGE_RANGES':
        return action.payload;
      default:
        return state;
    }
  };
  
export default ageRanges;