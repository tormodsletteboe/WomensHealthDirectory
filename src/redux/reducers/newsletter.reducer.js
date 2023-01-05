const newsletterEmails = (state = [], action) => {
    switch (action.type) {
      case 'SET_NEWSLETTER_EMAILS':
        return action.payload;
      default:
        return state;
    }
  };
  
export default newsletterEmails;