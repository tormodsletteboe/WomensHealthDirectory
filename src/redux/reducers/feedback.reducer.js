const feedback = (state = {}, action) => {

    if (action.type === 'SET_USER_FEEDBACK') {
        return action.payload;
    }
    return state;
};

export default feedback;