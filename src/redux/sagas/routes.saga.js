import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* postRoute (action) {
    console.log('action.payload in postRoute saga function',action.payload);
    try {

    yield axios.post('/api/route', action.payload);
    // yield put({type: 'FETCH_ROUTES', payload: ??.data}); // ADD LATER

    } catch {

        console.log('error in postRoute saga');

    }

}

function* postRouteSaga () {
    yield takeLatest('ADD_ROUTE', postRoute);
}

export default postRouteSaga;