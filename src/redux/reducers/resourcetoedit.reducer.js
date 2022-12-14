const resourceToEdit = (state = {}, action) => {
  switch (action.type) {
    case 'SET_RESOURCE_TO_EDIT':
      return action.payload;
    case 'UPDATE_FIELD':
      return { 
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
};
  
  
export default resourceToEdit;