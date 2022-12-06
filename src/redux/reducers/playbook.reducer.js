// array from axios.get('/api/playbook/:age/:category');
const array = (state = [], action) => {
    switch(action.type) {
        case 'SET_PLAYBOOK_ARRAY': return action.payload;
        default: return state;
    }
}

// const pb = useSelector(store => store.playbook);
export default array; // pb[];