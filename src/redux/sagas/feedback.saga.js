import axios from "axios";
import { takeLatest } from "redux-saga/effects";

function* submitSurvey(action) {
    try {
        yield axios.post('/api/feedback', action.payload);
    } catch (err) {
        console.log('unable to submit survey to feedback table', err);
    }
}

export default function* feedbackSaga() {
    yield takeLatest('SUBMIT_SURVEY', submitSurvey);
}