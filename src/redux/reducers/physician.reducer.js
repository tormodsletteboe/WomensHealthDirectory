// array of physicians from axios.get('/api/physician');
const array = (state = [], action) => {
    switch(action.type) {
        case 'SET_PHYSICIAN_ARRAY': return action.payload;
        default: return state;
    }
}

// const phys = useSelector(store => store.physician);
export default array; // phys[];