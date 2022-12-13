import { put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";


// POST request to send age to database

function* fetchHealthCategories(action) {

    console.log('in retrieveSearchResults saga, action.payload is', action.payload);

    let age = action.payload;

    try {

        const response = yield axios.post('/api/search', { data: age });
        console.log('response.data is', response.data);

        yield put({ type: 'STORE_HEALTH_CATEGORIES', payload: response.data });

    } catch (err) {
        console.log('Error with posting age to preventativeCare', err);
    }

}

function* preventativeCareSaga() {
    yield takeLatest('SEND_AGE', fetchHealthCategories);

}

export default preventativeCareSaga;