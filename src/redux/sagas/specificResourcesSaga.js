import { put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";

// GET request to send age to database
function* fetchSpecificResources(action) {

    try {
<<<<<<< HEAD

=======
        console.log('in fetch resources');
>>>>>>> 92fc521 (resolve merge conflicts)
        const response = yield axios.get(`/api/adminprevcare/specificresources/${action.payload}`);

        yield put({ 
            type: 'SET_SPECIFIC_RESOURCES',
            payload: response.data
        });

    } catch (err) {
<<<<<<< HEAD
        console.error('Error with fetching specific resources', err);
    }
}

function* updateResource(action) {
    console.log('in update resource');

    try {
        
        const dataToSend = action.payload;
        console.log('data is', dataToSend);

        yield axios.put(`/api/adminprevcare/specificresources/${action.payload.categoryId}`,  dataToSend );

    } catch (err) {
        console.error('Error updating specific resource', err);
=======
        console.log('Error with fetching specific resources', err);
>>>>>>> 92fc521 (resolve merge conflicts)
    }
}

function* specificResourcesSaga() {
    yield takeLatest('FETCH_SPECIFIC_RESOURCES', fetchSpecificResources);
<<<<<<< HEAD

    yield takeLatest('SAVE_RESOURCE_UPDATE', updateResource);
=======
>>>>>>> 92fc521 (resolve merge conflicts)
}

export default specificResourcesSaga;