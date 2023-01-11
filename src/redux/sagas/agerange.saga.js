import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* fetchAgeRanges() {

    try {
        const dbRes = yield axios.get('/api/agerange');
        yield put({ type:'SET_AGE_RANGES', payload: dbRes.data });
    } catch (err) {
        console.error('Unable to fetch age ranges from table', err);
    }
}

function* fetchSelectedAgeRange(action) {
    
    const ageId = action.payload;

    try {
        const dbRes = yield axios.get(`/api/agerange/${ageId}`);
        yield put({ type:'SET_SELECTED_AGE_RANGE', payload: dbRes.data });
    } catch (err) {
        console.error('Unable to fetch specific age range from table', err);
    }
}

export default function* ageRangeSaga() {
    yield takeLatest('FETCH_AGE_RANGES', fetchAgeRanges);

    yield takeLatest('FETCH_SELECTED_AGE_RANGE', fetchSelectedAgeRange);
}

