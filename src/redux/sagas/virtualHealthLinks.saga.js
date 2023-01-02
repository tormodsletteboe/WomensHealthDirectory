import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* fetchVirtualHealthLinks() {
  try {
    //axios here
    //TODO:
     //const response = yield axios.get('/api/medicallinks');

     yield put({ 
        type: 'SET_VIRTUAL_HEALTH_LINKS',
        payload: response.data
    });

  } 
  catch (error) {
    console.log('virtual health links fetch failed',error);
  }
}

function* updateVirtualHealthLink(action){
    try {
        const dataToSend = action.payload;
        console.log('data is', dataToSend);

        //update the medical link in question
        //TODO:
        //yield axios.put(`/api/medicallinks/${action.payload.id}`,dataToSend);
        
        //update the store with updated info
        yield put({ type: 'FETCH_VIRTUALHEALTH_LINKS'});

    } catch (error) {
        console.log('update virtual health link failed',error);
    }

}
function* addVirtualHealthLink(action){
  try {
        const dataToSend = action.payload;
        
        //update the medical link in question
        //TODO:
        //yield axios.post(`/api/medicallinks`,dataToSend);
        
        //update the store with updated info
        yield put({ type: 'FETCH_VIRTUALHEALTH_LINKS'});
  } 
  catch (error) {
    console.log('add virtual health link failed',error);
  }
}

function* deleteVirtualHealthLink(action){
  try {
    
    //delete the medical link in question
    //TODO: 
    //yield axios.delete(`/api/medicallinks/${action.payload}`);
    
    //update the store with updated info
    yield put({ type: 'FETCH_VIRTUALHEALTH_LINKS'});
} 
catch (error) {
console.log('add virtual health link failed',error);
}
}

function* virtualHealthSaga() {
  yield takeLatest("FETCH_VIRTUALHEALTH_LINKS", fetchVirtualHealthLinks);
  yield takeLatest("UPDATE_VIRTUALHEALTH_LINK",updateVirtualHealthLink);
  yield takeLatest('ADD_VIRTUALHEALTH_LINK',addVirtualHealthLink);
  yield takeLatest('DELETE_VIRTUALHEALTH_LINK',deleteVirtualHealthLink);
}

export default virtualHealthSaga;
