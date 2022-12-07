import axios from "axios";
import { put, takeLatest } from "redux-saga/effects"

///////////////////////////////////////////////////////////////
/*
    This file is scheduled for changes!

    TODO: 
        delete entirely
                OR 
        implement for a different reducer/endpoint
*/
///////////////////////////////////////////////////////////////

function* fetchGuidelines() {
    try {
        let res = yield axios.get('/api/guideline');

        yield put({ type:'SET_GUIDELINE_ARRAY', payload: res.data });
    } catch (err) {
        console.log('Unable to get guidelines from table', err);
    }
}

/*
    payload = {
        info: string,
        age_range_id: int
    }
*/
function* addToGuidelines({ payload }) {
    try {
        yield axios.post('/api/guideline', payload );

        yield put({ type:'FETCH_GUIDELINES' });
    } catch (err) {
        console.log('Unable to add new guideline to table', err);
    }
}

/*
    payload = {
        info: string,
        age_range_id: int,
        id: int
    }
*/
function* updateGuidelines({ payload }) {
    try {
        yield axios.put('/api/guideline', payload );

        yield put({ type:'FETCH_GUIDELINES' });
    } catch (err) {
        console.log('Unable to update guideline to table', err);
    }
}

/*
    payload = id;
*/
function* deleteFromGuidelines({ payload }) {
    try {
        yield axios.delete('/api/guideline', {id: payload} );

        yield put({ type:'FETCH_GUIDELINES' });
    } catch (err) {
        console.log('Unable to delete guideline from table', err);
    }
}

export default function* guidelineSaga() {
    takeLatest('FETCH_GUIDELINES', fetchGuidelines);
    takeLatest('ADD_TO_GUIDELINES', addToGuidelines);
    takeLatest('UPDATE_GUIDELINES', updateGuidelines);
    takeLatest('DELETE_FROM_GUIDELINES', deleteFromGuidelines);
}