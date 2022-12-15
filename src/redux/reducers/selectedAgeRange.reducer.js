const selectedAgeRange = (state = {}, action) => {
  switch (action.type) {
    case 'SET_SELECTED_AGE_RANGE':
      return action.payload;
    case 'RESET_SELECTED_AGE_RANGE':
      return {};
    default:
      return state;
  }
};
  

export default selectedAgeRange;