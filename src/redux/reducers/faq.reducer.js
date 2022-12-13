const faq = (state = [], action) => {

    if (action.type === 'SET_FAQ') {
        return action.payload;
    }
    return state;
};

export default faq;