import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* fetch() {
    try {
        let res = yield axios.get('/api/');

        yield put({ type:'SET_', payload: res.data });
    } catch (err) {
        console.log('Unable to fetch ___ from table', err);
    }
}

function* addToNewsletter({ payload }) {
    try {
        yield axios.post('/api/newsletter', {email: payload});
    } catch (err) {
        console.log('Unable to add newsletter from table', err);
    }
}

export default function* newsletterSaga() {
    takeLatest('FETCH_', fetch);
    takeLatest('ADD_TO_NEWSLETTER', addToNewsletter);
}