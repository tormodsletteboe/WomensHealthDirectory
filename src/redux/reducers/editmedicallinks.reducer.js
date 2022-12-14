const editMedicalLinks = (state = {}, action) => {
  switch (action.type) {
    case "SET_MEDICAL_TITLE":
      return { ...state, title: action.payload };
    case "SET_MEDICAL_URL":
      return { ...state, url: action.payload };
    case "SET_MEDICAL_LOGO_URL":
      return { ...state, logo_url: action.payload };
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default editMedicalLinks;
