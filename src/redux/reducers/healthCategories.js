const healthCategories = (state = [], action) => {

    if (action.type === 'SET_HEALTH_CATEGORIES') {
        return action.payload;
    }
    return state;
};

export default healthCategories;