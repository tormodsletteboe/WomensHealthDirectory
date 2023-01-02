const virtualhealthlinks = (state = [], action) => {
    switch (action.type) {
      case 'SET_VIRTUAL_HEALTH_LINKS':
        return action.payload;
      default:
        return state;
    }
  };
  
export default virtualhealthlinks;
