import { put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";


// GET request to request FAQ from database
function* fetchFaq(action) {

    try {

        const response = yield axios.get(`/api/faq/${category.id}/ages/${age}`);
        console.log('response.data is', response.data);

        yield put({ 
            type: 'SET_FAQ',
            payload: response.data
    });

    } catch (err) {
        console.log('Error with fetching FAQ', err);
    }

}

function* faqSaga() {
    yield takeLatest('FETCH_FAQ', fetchFaq);

}

export default faqSaga;