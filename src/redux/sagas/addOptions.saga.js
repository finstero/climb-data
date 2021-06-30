import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// function* getAddOptions () {
//     console.log('in getAddOptions');
//     try {

//     const grades = yield axios.get(`/api/grades`);
//     yield put({type: 'SET_GRADES', payload: grades.data});

//     } catch {

//         console.log('error in getAddOptions saga');

//     }

// }

// handles grabbing all grades for one grade type
function* getGradeScheme (action) {
    console.log('in getAddOptions action.payload', action.payload);
    try {

    const grades = yield axios.get(`/api/grades/?gradeScheme=${action.payload.gradeScheme}`);
    yield put({type: 'SET_GRADES', payload: grades.data});

    } catch {

        console.log('error in getAddOptions saga');

    }

}

function* addOptionsSaga () {
    // yield takeLatest('FETCH_ADD_OPTIONS', getAddOptions);
    yield takeLatest('FETCH_GRADE_SCHEME', getGradeScheme);
}

export default addOptionsSaga;