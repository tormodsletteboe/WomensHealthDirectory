import axios from "axios";
import { put, takeLatest } from "redux-saga/effects"

/*
    TEMPLATE SAGA FILE

        GET, POST, PUT, DELETE routes

        Update function names, axios endpoints, 
        put dispatches, and takeLatest saga points

        Be sure to create a corresponding .reducer.js
*/

function* fetch() {
    try {
        let res = yield axios.get('/api/');

        yield put({ type:'SET_', payload: res.data });
    } catch (err) {
        console.log('Unable to get ____ from table', err);
    }
}

function* addTo() {
    try {
        yield axios.post('/api/', {} );

        yield put({ type:'FETCH_' });
    } catch (err) {
        console.log('Unable to add ____ to table', err);
    }
}

function* update() {
    try {
        yield axios.put('/api/', {} );

        yield put({ type:'FETCH_' });
    } catch (err) {
        console.log('Unable to update ____ to table', err);
    }
}

function* deleteFrom() {
    try {
        yield axios.delete('/api/', {} );

        yield put({ type:'FETCH_' });
    } catch (err) {
        console.log('Unable to delete ____ from table', err);
    }
}

export default function* Saga() {
    takeLatest('FETCH_', fetch);
    takeLatest('ADD_TO_', addTo);
    takeLatest('UPDATE_', update);
    takeLatest('DELETE_FROM_', deleteFrom);
}