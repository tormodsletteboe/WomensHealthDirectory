const preventativeCare = (state = [], action) => {

    if (action.type === 'STORE_AGE') {
        return action.payload;
    }
    return state;
};

export default preventativeCare;