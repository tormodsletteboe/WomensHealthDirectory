const addVirtualHealthLinks = (state = {}, action) => {
    switch (action.type) {
      case "SET_VIRTUALHEALTH_TITLE":
        return { ...state, title: action.payload };
      case "SET_VIRTUALHEALTH_URL":
        return { ...state, url: action.payload };
      case "SET_VIRTUALHEALTH_LOGO_URL":
        return { ...state, logo_url: action.payload };
      case "SET_VIRTUALHEALTH_DESCRIPTION":
        return { ...state, description: action.payload };
        case "SET_VIRTUALHEALTH_SPECIALTY":
            return {...state,specialty:action.payload};
      case "CLEAR_ADD_VIRTUALHEALTH_LINKS":
        return {};
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default addVirtualHealthLinks;
  