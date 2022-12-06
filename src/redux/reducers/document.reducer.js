// array of documents from axios.get('/api/document/');
const array = (state = [], action) => {
    switch(action.type) {
        case 'SET_DOCUMENTS_ARRAY': return action.payload;
        default: return state;
    }
}

// const doc = useSelector(store => store.document);
export default array; // doc[];