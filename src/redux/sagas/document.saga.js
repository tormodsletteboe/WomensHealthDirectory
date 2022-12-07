import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* fetchDocuments() {
    try {
        let res = yield axios.get('/api/document');

        yield put({ type: 'SET_DOCUMENTS_ARRAY', payload: res.data });
    } catch (err) {
        console.log('Unable to fetch documents from database', err);
    }
}

function* addToDocuments({ payload }) {
    try {
        yield axios.post('/api/document', payload);

        yield put({ type: 'FETCH_DOCUMENTS' });
    } catch (err) {
        console.log('Unable to add to document table', err);
    }
}

function* deleteFromDocuments({ payload }) {
    try {
        yield axios.delete('/api/document', payload);

        yield put({ type: 'FETCH_DOCUMENTS' });
    } catch (err) {
        console.log('Unable to delete from document table', err);
    }
}

export default function* documentSaga() {
    takeLatest('FETCH_DOCUMENTS', fetchDocuments);
    takeLatest('ADD_TO_DOCUMENTS', addToDocuments);
    takeLatest('DELETE_FROM_DOCUMENTS', deleteFromDocuments);
}