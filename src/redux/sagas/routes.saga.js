import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* postRoute (action) {
    console.log('action.payload in postRoute saga function',action.payload);
    try {

    yield axios.post('/api/routes', action.payload);
    yield put({type: 'FETCH_LATEST_ROUTE'});

    } catch {

        console.log('error in postRoute saga');

    }
}

function* getLatestRoute () {
    console.log('in getRoute saga');
    try {

        const latestRoute = yield axios.get('/api/routes/latest'); // want :id to be {actual id}
        yield put({type: 'SET_LATEST_ROUTE', payload: latestRoute.data});
        console.log('getLatestRoute saga', latestRoute.data);
        } catch {
    
            console.log('error in getLatestRoute saga');
    
        }
}

function* routesSaga () {
    yield takeLatest('ADD_ROUTE', postRoute);
    yield takeLatest('FETCH_LATEST_ROUTE', getLatestRoute);
}

export default routesSaga;