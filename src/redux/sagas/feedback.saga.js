import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* fetchFeedback() {
    try {
        let res = yield axios.get('/api/feedback');

        yield put({ type:'SET_FEEDBACK_ARRAY', payload: res.data });
    } catch (err) {
        console.log('Unable to get feedback from table', err);
    }
}

function* fetchRatingAverage() {
    try {
        let res = yield axios.get('/api/feedback/avg');

        yield put({ type:'SET_AVERAGE_RATING', payload: res.data });
    } catch (err) {
        console.log('Unable to get average rating from table', err);
    }
}

/*
    payload = {
        rating: int,
        comment: string,
        user_id: int
    }
*/
function* addToFeedback({ payload }) {
    try {
        yield axios.post('/api/feedback', payload );

        yield put({ type:'FETCH_FEEDBACK' });
    } catch (err) {
        console.log('Unable to add feedback to table', err);
    }
}

/*
    payload = id;
*/
function* deleteFromFeedback({ payload }) {
    try {
        yield axios.delete('/api/feedback', {id: payload})

        yield put({ type:'FETCH_FEEDBACK' });
    } catch (err) {
        console.log('Unable to delete feedback from table', err);
    }
}

export default function* feedbackSaga() {
    yield takeLatest('FETCH_FEEDBACK', fetchFeedback);
    yield takeLatest('FETCH_RATING_AVERAGE', fetchRatingAverage);
    yield takeLatest('ADD_TO_FEEDBACK', addToFeedback);
    yield takeLatest('DELETE_FROM_FEEDBACK', deleteFromFeedback);
}