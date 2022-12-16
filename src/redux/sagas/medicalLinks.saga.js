import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* fetchMedicalLinks() {
  try {
    //axios here

     const response = yield axios.get('/api/medicallinks');

     yield put({ 
        type: 'SET_MEDICAL_LINKS',
        payload: response.data
    });

  } 
  catch (error) {
    console.log('medical links fetch failed',error);
  }
}

function* updateMedicalLink(action){
    try {
        const dataToSend = action.payload;
        console.log('data is', dataToSend);

        //update the medical link in question
        yield axios.put(`/api/medicallinks/${action.payload.id}`,dataToSend);
        
        //update the store with updated info
        yield put({ type: 'FETCH_MEDICAL_LINKS'});

    } catch (error) {
        console.log('update medical link failed',error);
    }

}
function* addMedicalLink(action){
  try {
        const dataToSend = action.payload;
        
        //update the medical link in question
        yield axios.post(`/api/medicallinks`,dataToSend);
        
        //update the store with updated info
        yield put({ type: 'FETCH_MEDICAL_LINKS'});
  } 
  catch (error) {
    console.log('add medical link failed',error);
  }
}

function* deleteMedicalLink(action){
  try {
    
    //delete the medical link in question
    yield axios.delete(`/api/medicallinks/${action.payload}`);
    
    //update the store with updated info
    yield put({ type: 'FETCH_MEDICAL_LINKS'});
} 
catch (error) {
console.log('add medical link failed',error);
}
}

function* medicalLinksSaga() {
  yield takeLatest("FETCH_MEDICAL_LINKS", fetchMedicalLinks);
  yield takeLatest("UPDATE_MEDICAL_LINK",updateMedicalLink);
  yield takeLatest('ADD_MEDICAL_LINK',addMedicalLink);
  yield takeLatest('DELETE_MEDICAL_LINK',deleteMedicalLink);
}

export default medicalLinksSaga;
