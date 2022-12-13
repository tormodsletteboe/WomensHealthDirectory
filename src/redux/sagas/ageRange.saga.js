import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* fetchAgeRanges(action) {

    console.log('in fetch');
    try {
        const dbRes = yield axios.get('/api/agerange');
        console.log('res is', dbRes);
        yield put({ type:'SET_AGE_RANGES', payload: dbRes.data });
    } catch (err) {
        console.log('Unable to fetch age ranges from table', err);
    }
}

export default function* ageRangeSaga() {
    takeLatest('FETCH_AGE_RANGES', fetchAgeRanges);
}

