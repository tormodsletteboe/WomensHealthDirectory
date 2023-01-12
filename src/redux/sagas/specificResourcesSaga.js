import { put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";

// fetches all resources in the specific health category
function* fetchSpecificResources(action) {

    try {
        const response = yield axios.get(`/api/adminprevcare/specificresources/${action.payload.categoryId}`);

        yield put({ 
            type: 'SET_SPECIFIC_RESOURCES',
            payload: response.data
        });

    } catch (err) {
        console.error('Error with fetching specific resources', err);
    }
}

// adds resource in the specific health category
function* addResource(action) {
    
    try {
        const categoryId = action.payload.categoryId;
        const dataToSend = action.payload;

        yield axios.post(`/api/adminprevcare/specificresources/${action.payload.categoryId}`,  dataToSend );

        yield put({type: 'FETCH_SPECIFIC_RESOURCES' , payload: {categoryId: categoryId}});
    } catch (err) {
        console.error('Error adding specific resource', err);
    }
}

// updates resource in the specific health category
function* updateResource(action) {
    
    try {
        const categoryId = action.payload.categoryId;
        const dataToSend = action.payload;

        yield axios.put(`/api/adminprevcare/specificresources/${action.payload.categoryId}`,  dataToSend );

        yield put({type: 'FETCH_SPECIFIC_RESOURCES' , payload: {categoryId: categoryId}});
    } catch (err) {
        console.error('Error updating specific resource', err);
    }
}

// deletes resource in the specific health category
function* deleteResource(action) {
    try {
        const categoryId = action.payload.categoryId;

        yield axios.delete(`/api/adminprevcare/specificresources/${action.payload.categoryId}`, {data: action.payload});
            
        yield put({type: 'FETCH_SPECIFIC_RESOURCES' , payload: {categoryId: categoryId}});

        } catch (error) {
        console.error('Error deleting resource:', error);
        alert('could not delete resource');
    }
  }

function* specificResourcesSaga() {
    yield takeLatest('FETCH_SPECIFIC_RESOURCES', fetchSpecificResources);

    yield takeLatest('SAVE_RESOURCE_UPDATE', updateResource);

    yield takeLatest('ADD_RESOURCE', addResource);

    yield takeLatest('DELETE_RESOURCE', deleteResource)
}

export default specificResourcesSaga;