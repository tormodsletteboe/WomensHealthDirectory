// array of guidelines from axios.get('/api/guideline/:id');
const array = (state = [], action) => {
    switch(action.type) {
        case 'SET_GUIDELINE_ARRAY': return action.payload;
        default: return state;
    }
}

// const gl = useSelector(store => store.guideline);
export default array; // gl[]

///////////////////////////////////////////////////////////////
/*
    This file is scheduled for changes!

    TODO: 
        delete entirely
                OR 
        implement for a different endpoint
*/
///////////////////////////////////////////////////////////////