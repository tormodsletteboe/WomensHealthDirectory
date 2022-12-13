import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* fetch() {
    try {
        let res = yield axios.get('/api/agerange');

        yield put({ type:'SET_AGE_RANGES', payload: res.data });
    } catch (err) {
        console.log('Unable to fetch age ranges from table', err);
    }
}

export default function* ageRangeSaga() {
    takeLatest('FETCH_AGE_RANGES', fetch);
}