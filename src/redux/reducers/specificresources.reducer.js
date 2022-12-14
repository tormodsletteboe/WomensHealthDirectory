const specificResources = (state = [], action) => {
    switch (action.type) {
      case 'SET_SPECIFIC_RESOURCES':
        return action.payload;
      default:
        return state;
    }
  };
  
export default specificResources;