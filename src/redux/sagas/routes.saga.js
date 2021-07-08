import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// handles posting one route - at same time calls getLatestRoute
function* postRoute(action) {
    console.log('action.payload in postRoute saga function', action.payload);

    try {
        yield axios.post('/api/routes', action.payload);
        // yield put({type: 'SET_ID', payload: createdRouteId.id})
        yield put({ type: 'FETCH_LATEST_ROUTE'});
        // console.log('createdRouteId', createdRouteId.data);
    } catch {
        console.log('error in postRoute saga');
    }
}

// handles one route - last to be added by user - stores in reducer
function* getLatestRoute() {
    console.log('in getRoute saga');

    try {
        const latestRoute = yield axios.get('/api/routes/latest'); // want :id to be {actual id}
        yield put({ type: 'SET_LATEST_ROUTE', payload: latestRoute.data });
        console.log('getLatestRoute saga', latestRoute.data);

    } catch {
        console.log('error in getLatestRoute saga');
    }
}

// handles one route - clicked on in RouteList - stores in reducer
function* getOneRoute(action) {
    console.log('in getOneRoute saga', action.payload.id);

    try {
        const oneRoute = yield axios.get(`/api/routes/details/${action.payload.id}`); // want :id to be {actual id}
        yield put({ type: 'SET_ONE_ROUTE', payload: oneRoute.data });
        console.log('getOneRoute saga', oneRoute.data);

    } catch {
        console.log('error in getOneRoute saga');
    }
}

// gets all routes for user in database. puts in reducer
function* getAllRoutes() {
    console.log('in getAllRoutes saga');

    try {
        const allRoutes = yield axios.get('/api/routes');
        yield put({ type: 'SET_ALL_ROUTES', payload: allRoutes.data })

    } catch {
        console.log('error in getAllRoutes saga');
    }
}

// deletes single route selected by user
function* deleteRoute (action) {
    console.log('in deleteRoute saga', action.payload);

    try{
        yield axios.delete(`/api/routes/details/${action.payload.id}`);
        yield put({ type: 'FETCH_ALL_ROUTES'});
    } catch {
        console.log('error in deleteRoute saga');
    }
}

// edits single route
function* editRoute (action) {
    console.log('in editRoute saga', action.payload);

    try{
        yield axios.put(`api/routes/edit/${action.payload.id}`, action.payload);
        // yield put({type: 'SET_ONE_ROUTE', payload: ''})
        yield put({ type: 'FETCH_ALL_ROUTES'});
    } catch{
        console.log('error in editRoute saga');
    }
}

function* getFilteredRoutes(action) {
    console.log('in getFilteredRoutes saga');

    try {
        const filteredRoutes = yield axios.get('/api/routes/filter', {params: action.payload});
        yield put({ type: 'SET_ALL_ROUTES', payload: filteredRoutes.data })

    } catch {
        console.log('error in getFilteredRoutes saga');
    }
}

function* routesSaga() {
    yield takeLatest('ADD_ROUTE', postRoute);
    yield takeLatest('FETCH_LATEST_ROUTE', getLatestRoute);
    yield takeLatest('FETCH_ALL_ROUTES', getAllRoutes);
    yield takeLatest('FETCH_ONE_ROUTE', getOneRoute);
    yield takeLatest('DELETE_ROUTE', deleteRoute);
    yield takeLatest('EDIT_ROUTE', editRoute);
    yield takeLatest('FETCH_FILTERED_ROUTES', getFilteredRoutes);
}

export default routesSaga;