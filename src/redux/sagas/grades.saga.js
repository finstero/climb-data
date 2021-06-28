import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import RoutesHome from '../../components/RoutesHome/RoutesHome';

function* getGrades () {

    try {

    const grades = yield axios.get('/api/grades');
    yield put({type: 'SET_GRADES', payload: routes.data});

    } catch {

        console.log('error in getGrades saga');

    }

}

function* gradesSaga () {
    yield takeLatest('FETCH_GRADES', getGrades);
}

export default gradesSaga;