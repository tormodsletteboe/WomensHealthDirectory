import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// worker Saga: will be fired on "FETCH_VIRTUALHEALTH_LINKS" actions
function* fetchVirtualHealthLinks() {
  try {
    //axios here

    const response = yield axios.get("/api/virtualhealthlinks");

    yield put({
      type: "SET_VIRTUAL_HEALTH_LINKS",
      payload: response.data,
    });
  } catch (error) {
    console.log("virtual health links fetch failed", error);
  }
}

// worker Saga: will be fired on "UPDATE_VIRTUALHEALTH_LINK" actions
function* updateVirtualHealthLink(action) {
  try {
    const dataToSend = action.payload;
    console.log("data is", dataToSend);

    //update the virtual health link in question
    yield axios.put(`/api/virtualhealthlinks/${action.payload.id}`, dataToSend);

    //update the store with updated info
    yield put({ type: "FETCH_VIRTUALHEALTH_LINKS" });
  } catch (error) {
    console.log("update virtual health link failed", error);
  }
}

// worker Saga: will be fired on "ADD_VIRTUALHEALTH_LINK" actions
function* addVirtualHealthLink(action) {
  try {
    const dataToSend = action.payload;

    //update the medical link in question

    yield axios.post(`/api/virtualhealthlinks`, dataToSend);

    //update the store with updated info
    yield put({ type: "FETCH_VIRTUALHEALTH_LINKS" });
  } catch (error) {
    console.log("add virtual health link failed", error);
  }
}

// worker Saga: will be fired on "DELETE_VIRTUALHEALTH_LINK" actions
function* deleteVirtualHealthLink(action) {
  try {
    //delete the medical link in question

    yield axios.delete(`/api/virtualhealthlinks/${action.payload}`);

    //update the store with updated info
    yield put({ type: "FETCH_VIRTUALHEALTH_LINKS" });
  } catch (error) {
    console.log("delete virtual health link failed", error);
  }
}

function* virtualHealthSaga() {
  yield takeLatest("FETCH_VIRTUALHEALTH_LINKS", fetchVirtualHealthLinks);
  yield takeLatest("UPDATE_VIRTUALHEALTH_LINK", updateVirtualHealthLink);
  yield takeLatest("ADD_VIRTUALHEALTH_LINK", addVirtualHealthLink);
  yield takeLatest("DELETE_VIRTUALHEALTH_LINK", deleteVirtualHealthLink);
}

export default virtualHealthSaga;
