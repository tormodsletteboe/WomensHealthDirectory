import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* fetchNewsletter() {
    try {
        let res = yield axios.get('/api/newsletter');

        yield put({ type:'SET_NEWSLETTER_EMAILS', payload: res.data });
    } catch (err) {
        console.error('Unable to fetch ___ from table', err);
    }
}

function* addToNewsletter(action) {

    try {
        yield axios.post('/api/newsletter', {email: action.payload});

    } catch (err) {
        console.error('Unable to add newsletter from table', err);
    }
}

function* sendNewsletter(action) {

    try {
        yield axios.post('/api/nodemailer', {htmlToSend: action.payload.htmlToSend, emailList: action.payload.emailList});
        
    } catch (err) {
        console.error('Unable to send newsletter ', err);
        alert('email send failed');
    }
}

export default function* newsletterSaga() {
    yield takeLatest('FETCH_NEWSLETTER_EMAILS', fetchNewsletter);

    yield takeLatest('ADD_TO_NEWSLETTER', addToNewsletter);

    yield takeLatest('SEND_NEWSLETTER', sendNewsletter);
}