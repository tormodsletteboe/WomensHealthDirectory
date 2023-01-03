import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* fetchAgeRanges() {

    console.log('in fetch');
    try {
        const dbRes = yield axios.get('/api/agerange');
        console.log('res is', dbRes);
        yield put({ type:'SET_AGE_RANGES', payload: dbRes.data });
    } catch (err) {
        console.log('Unable to fetch age ranges from table', err);
    }
}

function* fetchSelectedAgeRange(action) {

    console.log('in fetch specific age range');
    
    const ageId = action.payload;

    try {
        const dbRes = yield axios.get(`/api/agerange/${ageId}`);
        console.log('res is', dbRes);
        yield put({ type:'SET_SELECTED_AGE_RANGE', payload: dbRes.data });
    } catch (err) {
        console.log('Unable to fetch specific age range from table', err);
    }
}

export default function* ageRangeSaga() {
    yield takeLatest('FETCH_AGE_RANGES', fetchAgeRanges);

    yield takeLatest('FETCH_SELECTED_AGE_RANGE', fetchSelectedAgeRange);
}

