//reducer for add medical links admin side only

const addMedicalLinks = (state = {}, action) => {
  switch (action.type) {
    case "SET_MEDICAL_TITLE":
      return { ...state, title: action.payload };
    case "SET_MEDICAL_URL":
      return { ...state, url: action.payload };
    case "SET_MEDICAL_LOGO_URL":
      return { ...state, logo_url: action.payload };
    case "SET_MEDICAL_DESCRIPTION":
      return { ...state, description: action.payload };
    case "CLEAR_ADD_MEDICAL_LINKS":
      return {};
    default:
      return state;
  }
};

export default addMedicalLinks;
