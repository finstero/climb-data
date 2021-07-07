import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getRopeOptions () {
    // console.log('in getRopeOptions');
    try {

    const ropeOptions = yield axios.get(`/api/routes/options/rope`);
    yield put({type: 'SET_ROPES', payload: ropeOptions.data});

    } catch {
        console.log('error in getRopeOptions saga');
    }
}

// handles grabbing all grades for one grade type
function* getGradeScheme (action) {
    // console.log('in getGradeScheme action.payload', action.payload);
    try {

    const grades = yield axios.get(`/api/grades/${action.payload.gradeScheme}`);
    // console.log('in getGradeScheme', grades.data);
    yield put({type: 'SET_GRADES', payload: grades.data});

    } catch {
        console.log('error in getAddOptions saga');
    }

}

function* formOptionsSaga () {
    yield takeLatest('FETCH_FORM_OPTIONS', getRopeOptions);
    yield takeLatest('FETCH_GRADE_SCHEME', getGradeScheme);
}

export default formOptionsSaga;