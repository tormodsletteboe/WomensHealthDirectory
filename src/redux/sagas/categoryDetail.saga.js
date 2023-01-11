import { put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";


// GET health category details from database
//Based on age range id and category id
function* fetchCategoryDetail(action) {

    let catId = action.payload.catId;

    let ageId = action.payload.ageId;

    try {

        const response = yield axios.get(`/api/preventativecare/${catId}/ages/${ageId}/`);

        yield put({
            type: 'SET_CATEGORY_DETAIL',
            payload: response.data
        });

    } catch (err) {
        console.log('Error with fetching category detail', err);
    }
}

function* fetchSpecificCategoryDetail(action) {

    let catId = action.payload.catId;
    console.log('catId is', catId);

    let ageId = action.payload.ageId;
    console.log('ageid is', ageId);

    let sectionName = action.payload.sectionName;
    console.log('sectionName is', sectionName);

    try {

        const response = yield axios.get(`/api/preventativecare/${catId}/ages/${ageId}/${sectionName}`);
        console.log('response.data is', response.data);

        yield put({
            type: 'SET_CATEGORY_DETAIL',
            payload: response.data
        });

    } catch (err) {
        console.log('Error with fetching category detail', err);
    }
}

function* updateCategoryDetail(action) {

    try {
        const catId = action.payload.catId;
        const ageId = action.payload.ageId;
        const sectionName = action.payload.sectionName;
        const dataToSend = action.payload;
        console.log('data is', dataToSend);

        yield axios.put(`/api/preventativecare/${catId}/ages/${ageId}/${sectionName}`, dataToSend);

        yield put({
            type: 'FETCH_SPECIFIC_CATEGORY_DETAIL',
            payload: { catId: catId, ageId: ageId, sectionName: sectionName }
        });
    } catch (err) {
        console.error('Error updating specific resource', err);
    }
}

function* addCategoryDetail(action) {
    try {
        const catId = action.payload.catId;
        const ageId = action.payload.ageId;
        const sectionName = action.payload.sectionName;
        const dataToSend = action.payload;
        console.log('data is', dataToSend);

        yield axios.post(`/api/preventativecare/${catId}/ages/${ageId}/${sectionName}`, dataToSend);

        yield put({
            type: 'FETCH_SPECIFIC_CATEGORY_DETAIL',
            payload: { catId: catId, ageId: ageId, sectionName: sectionName }
        });
    } catch (err) {
        console.error('Error adding specific category detail', err);
    }
}

function* deleteCategoryDetail(action) {
    try {
        const catId = action.payload.catId;
        const ageId = action.payload.ageId;
        const sectionName = action.payload.sectionName;

        yield axios.delete(`/api/preventativecare/${catId}/ages/${ageId}/${sectionName}`, { data: action.payload });

        yield put({
            type: 'FETCH_SPECIFIC_CATEGORY_DETAIL',
            payload: { catId: catId, ageId: ageId, sectionName: sectionName }
        });
    } catch (err) {
        console.error('Error deleting specific category detail', err);
    }
}

function* categoryDetailSaga() {
    yield takeLatest('FETCH_CATEGORY_DETAIL', fetchCategoryDetail);

    yield takeLatest('FETCH_SPECIFIC_CATEGORY_DETAIL', fetchSpecificCategoryDetail);

    yield takeLatest('SAVE_DETAIL_UPDATE', updateCategoryDetail);

    yield takeLatest('ADD_CATEGORY_DETAIL', addCategoryDetail);

    yield takeLatest('DELETE_CATEGORY_DETAIL', deleteCategoryDetail);
}

export default categoryDetailSaga;