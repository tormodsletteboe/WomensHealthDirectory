const categorydetail = (state = [], action) => {

    if (action.type === 'SET_CATEGORY_DETAIL') {
        return action.payload;
    }
    return state;
};

export default categorydetail;