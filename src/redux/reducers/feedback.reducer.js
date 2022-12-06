import { combineReducers } from "redux";

// array of feedback from axios.get('/api/feedback/');
const array = (state = [], action) => {
    switch(action.type) {
        case 'SET_FEEDBACK_ARRAY': return action.payload;
        default: return state;
    }
}

// average rating from axios.get('/api/feedback/avg');
const average = (state = 0, action) => {
    switch(action.type) {
        case 'SET_AVERAGE_RATING': return action.payload;
        default: return state;
    }
}

// const fb = useSelector(store => store.feedback)
export default combineReducers({
    array,      // fb.array[];
    average     // fb.average;
});