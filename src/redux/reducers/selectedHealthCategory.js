const selectedHealthCategory = (state = {}, action) => {
    switch (action.type) {
      case 'SET_SELECTED_CATEGORY':
        return action.payload;
      case 'RESET_SELECTED_CATEGORY':
        return {};
      default:
        return state;
    }
  };
    
  
export default selectedHealthCategory;