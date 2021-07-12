import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getAllGraph (action) {
    console.log('in getAllGraph saga');

    try {
        yield put({ type: 'CLEAR_ALL_GRAPH'});
        const forGraph = yield axios.get(`/api/routes/graph/${action.payload.gradeScheme}`);
        yield put({ type: 'SET_ALL_GRAPH', payload: forGraph.data })

    } catch {
        console.log('error in getAllRoutes saga');
    }
}

function* getFilteredGraph (action) {
    console.log('in getFilteredGraph saga', action.payload);

    try {
        yield put({ type: 'CLEAR_ALL_GRAPH'});
        const forGraph = yield axios.get(`/api/routes/graph`, {params: action.payload});
        // const forFilterDisplay = yield axios.get(`/api/routes/filterdisplay`, {params: action.payload});
        yield put({ type: 'SET_ALL_GRAPH', payload: forGraph.data });
        // yield put({ type: 'SET_GRAPH_FILTER_DISPLAY', payload: forFilterDisplay.data });


    } catch {
        console.log('error in getFilteredGraph saga');
    }
}

function* getOverlayGraph (action) {
    console.log('in getOverlayGraph saga');

    try {
        yield put({ type: 'CLEAR_OVERLAY_GRAPH'});
        const overlay = yield axios.get(`/api/routes/graph`, {params: action.payload});
        yield put({ type: 'SET_OVERLAY_GRAPH', payload: overlay.data })

    } catch {
        console.log('error in getOverlayGraph saga');
    }
}

function* graphsSaga() {
    yield takeLatest('FETCH_GRAPH_DATA', getAllGraph)
    yield takeLatest('FETCH_FILTERED_GRAPH', getFilteredGraph)
    yield takeLatest('FETCH_OVERLAY_GRAPH', getOverlayGraph)
}

export default graphsSaga;