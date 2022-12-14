import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* fetchMedicalLinks() {
  try {
    //axios here

     const response = yield axios.get('/api/medicallinks');

     yield put({ 
        type: 'SET_MEDICALLINKS',
        payload: response.data
    });

  } 
  catch (error) {
    console.log('medical links fetch failed',error);
  }
}

function* medicalLinksSaga() {
  yield takeLatest("FETCH_MEDICALLINKS", fetchMedicalLinks);
}

export default medicalLinksSaga;
