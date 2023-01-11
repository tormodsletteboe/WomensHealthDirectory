import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

function* fetchUserFeedback() {
    try {

        const response = yield axios.get('/api/feedback');

        yield put({
            type: 'SET_USER_FEEDBACK',
            payload: response.data
        });

    } catch (err) {
        console.log('Error with fetching user feedback', err);
    }
}

function* fetchAverageRating() {
    try {

        const response = yield axios.get('/api/feedback/avg');

        yield put({
            type: 'SET_AVERAGE_RATING',
            payload: response.data
        });

    } catch (err) {
        console.log('Error with fetching average rating', err);
    }
}

function* submitSurvey(action) {
    try {
        yield axios.post('/api/feedback', action.payload);
    } catch (err) {
        console.log('unable to submit survey to feedback table', err);
    }
}

export default function* feedbackSaga() {
    yield takeLatest('SUBMIT_SURVEY', submitSurvey);
    yield takeLatest('FETCH_USER_FEEDBACK', fetchUserFeedback);
    yield takeLatest('FETCH_AVERAGE_RATING', fetchAverageRating);
}