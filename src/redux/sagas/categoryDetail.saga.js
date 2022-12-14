import { put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";


// GET request to request FAQ from database
function* fetchCategoryDetail(action) {

    let catId = action.payload.catId;
    console.log('catId is', catId);
    
    let ageId= action.payload.ageId;
    console.log('ageid is', ageId);

    try {

        const response = yield axios.get(`/api/preventativecare/${catId}/ages/${ageId}`);
        console.log('response.data is', response.data);

        yield put({ 
            type: 'SET_CATEGORY_DETAIL',
            payload: response.data
    });

    } catch (err) {
        console.log('Error with fetching category detail', err);
    }

}

function* categoryDetailSaga() {
    yield takeLatest('FETCH_CATEGORY_DETAIL', fetchCategoryDetail);

}

export default categoryDetailSaga;