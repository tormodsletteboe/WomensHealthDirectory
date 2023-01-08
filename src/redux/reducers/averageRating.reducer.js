const averageRating = (state = [], action) => {

    if (action.type === 'SET_AVERAGE_RATING') {
        return action.payload;
    }
    return state;
};

export default averageRating;