import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* postRoute (action) {
    console.log('action.payload in postRoute saga function',action.payload);
    try {

    yield axios.post('/api/routes', action.payload);
    // yield put({type: 'FETCH_ROUTES', payload: ??.data}); // ADD LATER

    } catch {

        console.log('error in postRoute saga');

    }
}

function* getRoute () {
    console.log('in getRoute saga');
    try {

        yield axios.get('/api/routes');
        // yield put({type: 'FETCH_ROUTES', payload: ??.data}); // ADD LATER
    
        } catch {
    
            console.log('error in getRoute saga');
    
        }
}

function* routesSaga () {
    yield takeLatest('ADD_ROUTE', postRoute);
    yield takeLatest('FETCH_ROUTE', getRoute);
}

export default routesSaga;