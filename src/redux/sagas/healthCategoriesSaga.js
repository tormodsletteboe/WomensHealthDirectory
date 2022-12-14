import { put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";


// GET request to request health categories from database
function* fetchHealthCategories(action) {

    try {

        const response = yield axios.get('/api/preventativecare');
        // console.log('response.data is', response.data);

        yield put({ 
            type: 'SET_HEALTH_CATEGORIES',
            payload: response.data
    });

    } catch (err) {
        console.log('Error with fetching health categories', err);
    }

}

function* healthCategoriesSaga() {
    yield takeLatest('FETCH_HEALTH_CATEGORIES', fetchHealthCategories);

}

export default healthCategoriesSaga;