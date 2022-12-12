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

function* addTo() {
    try {
        yield axios.post('/api/');
    } catch (err) {
        console.log('Unable to add ___ from table', err);
    }
}

function* update() {
    try {
        yield axios.put('/api/');
    } catch (err) {
        console.log('Unable to update ___ from table', err);
    }
}

function* deleteFrom() {
    try {
        yield axios.delete('/api/');
    } catch (err) {
        console.log('Unable to delete ___ from table', err);
    }
}

export default function* Saga() {
    takeLatest('FETCH_', fetch);
    takeLatest('ADD_TO_', addTo);
    takeLatest('UPDATE_', update);
    takeLatest('DELETE_FROM_', deleteFrom);
}