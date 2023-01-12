//reducer for add virtual health links admin side only

const addVirtualHealthLinks = (state = {}, action) => {
  switch (action.type) {
    case "SET_VIRTUALHEALTH_TITLE":
      return { ...state, title: action.payload };
    case "SET_VIRTUALHEALTH_LINK":
      return { ...state, link: action.payload };
    case "SET_VIRTUALHEALTH_LOGO_URL":
      return { ...state, logo_url: action.payload };
    case "SET_VIRTUALHEALTH_DESCRIPTION":
      return { ...state, description: action.payload };
    case "SET_VIRTUALHEALTH_SPECIALTY":
      return { ...state, specialty: action.payload };
    case "SET_VIRTUALHEALTH_INFO_COST":
      return { ...state, info_cost: action.payload };
    case "CLEAR_ADD_VIRTUALHEALTH_LINKS":
      return {};
    default:
      return state;
  }
};


export default addVirtualHealthLinks;
