import { put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";

// GET request to send age to database
function* fetchSpecificResources(action) {

    try {
        console.log('in fetch resources');
        const response = yield axios.get(`/api/adminprevcare/specificresources/${action.payload}`);

        yield put({ 
            type: 'SET_SPECIFIC_RESOURCES',
            payload: response.data
        });

    } catch (err) {
        console.log('Error with fetching specific resources', err);
    }
}

function* specificResourcesSaga() {
    yield takeLatest('FETCH_SPECIFIC_RESOURCES', fetchSpecificResources);
}

export default specificResourcesSaga;