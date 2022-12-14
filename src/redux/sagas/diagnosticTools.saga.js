import { put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";
import {useSelector} from 'react-redux';


// GET request to fetch diagnostic tools from database
function* fetchDiagnosticTools(action) {



    try {

        const response = yield axios.get(`/api/preventativecare/${category.id}/${age}`);
        console.log('response.data is', response.data);

        yield put({ 
            type: 'SET_HEALTH_CATEGORIES',
            payload: response.data
    });

    } catch (err) {
        console.log('Error with fetching diagnostic tools', err);
    }

}

function* diagnosticToolsSaga() {
    yield takeLatest('FETCH_DIAGNOSTIC_TOOLS', fetchDiagnosticTools);

}

export default diagnosticToolsSaga;