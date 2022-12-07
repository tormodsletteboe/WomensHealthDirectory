import axios from "axios";
import { put, takeLatest } from "redux-saga/effects"

function* fetchPhysicians() {
    try {
        let res = yield axios.get('/api/physician');

        yield put({ type:'SET_PHYSICIAN_ARRAY', payload: res.data });
    } catch (err) {
        console.log('Unable to get physician from table', err);
    }
}

/*
    payload = {
        name: string,
        email: string
    }
*/
function* addToPhysicians({ payload }) {
    try {
        yield axios.post('/api/physician', payload );

        yield put({ type:'FETCH_PHYSICIANS' });
    } catch (err) {
        console.log('Unable to add physician to table', err);
    }
}

/*
    payload = {
        name: string,
        email: string,
        id: int
    }
*/
function* updatePhysicians({ payload }) {
    try {
        yield axios.put('/api/physician', payload );

        yield put({ type:'FETCH_PHYSICIANS' });
    } catch (err) {
        console.log('Unable to update physician to table', err);
    }
}

// payload = id;
function* deleteFromPhysicians({ payload }) {
    try {
        yield axios.delete('/api/physician', {id: payload} );

        yield put({ type:'FETCH_PHYSICIANS' });
    } catch (err) {
        console.log('Unable to delete physician from table', err);
    }
}

export default function* physicianSaga() {
    takeLatest('FETCH_PHYSICIANS', fetchPhysicians);
    takeLatest('ADD_TO_PHYSICIANS', addToPhysicians);
    takeLatest('UPDATE_PHYSICIANS', updatePhysicians);
    takeLatest('DELETE_FROM_PHYSICIANS', deleteFromPhysicians);
}