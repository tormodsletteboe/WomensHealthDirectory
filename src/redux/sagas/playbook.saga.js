import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

/*
    payload = {
        age_range_id: int,
        category_id: int
    }
*/
function* fetchPlaybook({ payload }) {
    try {
        let res = yield axios.get(`/api/playbook/${payload.age_range_id}/${payload.category_id}`);

        yield put({ type: 'SET_PLAYBOOK_ARRAY', payload: res.data });
    } catch (err) {
        console.log('Unable to get playbook array from table : ', err);
    }
}

/*
    payload = {
        question: string,
        age_range_id: int,
        category_id: int
    }
*/
function* addToPlaybook({ payload }) {
    try {
        yield axios.post('/api/playbook', payload);

        yield put({ type: 'FETCH_PLAYBOOK', payload })
    } catch (err) {
        console.log('Unable to add new row to playbook table : ', err);
    }
}

/*
    payload = {
        id: int,
        question: string,
        age_range_id: int,
        category_id: int
    }
*/
function* updatePlaybook({ payload }) {
    try {
        yield axios.put('/api/playbook', payload);

        yield put({ type: 'FETCH_PLAYBOOK', payload });
    } catch (err) {
        console.log('Unable to update row on table : ', err);
    }
}

/*
    payload = {
        id: int,
        age_range_id: int,
        category_id: int
    };
*/
function deleteFromPlaybook({ payload }) {
    try {
        yield axios.delete('/api/playbook', { id: payload.id });

        yield put({ type: 'FETCH_PLAYBOOK', payload })
    } catch (err) {
        console.log('Unable to delete row on table : ', err);
    }
}

export default function* playbookSaga() {
    yield takeLatest('FETCH_PLAYBOOK', fetchPlaybook);
    yield takeLatest('ADD_TO_PLAYBOOK', addToPlaybook);
    yield takeLatest('UPDATE_PLAYBOOK', updatePlaybook);
    yield takeLatest('DELETE_FROM_PLAYBOOK', deleteFromPlaybook);
}