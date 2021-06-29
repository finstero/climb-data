import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getAddOptions () {

    try {

    const grades = yield axios.get('/api/grades');
    yield put({type: 'SET_GRADES', payload: grades.data});

    } catch {

        console.log('error in getGrades saga');

    }

}

function* addOptionsSaga () {
    yield takeLatest('FETCH_ADD_OPTIONS', getAddOptions);
}

export default addOptionsSaga;