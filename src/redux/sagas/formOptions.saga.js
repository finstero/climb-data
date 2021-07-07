import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

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

function* getRopeOptions () {
    // console.log('in getRopeOptions');
    try {

    const ropeOptions = yield axios.get(`/api/routes/options/rope`);
    yield put({type: 'SET_ROPES', payload: ropeOptions.data});

    } catch {
        console.log('error in getRopeOptions saga');
    }
}

function* getWallOptions () {
    // console.log('in getWallOptions');
    try {

    const wallOptions = yield axios.get(`/api/routes/options/wall`);
    yield put({type: 'SET_WALLS', payload: wallOptions.data});

    } catch {
        console.log('error in getWallOptions saga');
    }
}

function* formOptionsSaga () {
    
    yield takeLatest('FETCH_GRADE_SCHEME', getGradeScheme);
    yield takeLatest('FETCH_FORM_OPTIONS', getRopeOptions);
    yield takeLatest('FETCH_FORM_OPTIONS', getWallOptions);
}

export default formOptionsSaga;