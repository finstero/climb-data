import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getAddOptions (action) {
    console.log('in getAddOptions action.payload', action.payload);
    try {

    const grades = yield axios.get(`/api/grades/?gradeScheme=${action.payload.gradeScheme}`);
    yield put({type: 'SET_GRADES', payload: grades.data});

    } catch {

        console.log('error in getAddOptions saga');

    }

}

function* addOptionsSaga () {
    yield takeLatest('FETCH_ADD_OPTIONS', getAddOptions);
}

export default addOptionsSaga;