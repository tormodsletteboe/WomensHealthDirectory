//medical links reducer, user side and admin side

const medicallinks = (state = [], action) => {
    switch (action.type) {
      case 'SET_MEDICAL_LINKS':
        return action.payload;
      default:
        return state;
    }
  };
  
export default medicallinks;