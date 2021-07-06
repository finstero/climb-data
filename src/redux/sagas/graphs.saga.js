import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getAllGraph () {
    console.log('in getAllGraph saga');

    try {
        const forGraph = yield axios.get('/api/routes/graph');
        yield put({ type: 'SET_ALL_GRAPH', payload: forGraph.data })

    } catch {
        console.log('error in getAllRoutes saga');
    }
}

function* getFilteredGraph (action) {
    console.log('in getFilteredGraph saga', action.payload);

    try {
        const forGraph = yield axios.put(`/api/routes/graph/filtered`, action.payload);
        yield put({ type: 'SET_ALL_GRAPH', payload: forGraph.data })

    } catch {
        console.log('error in getFilteredGraph saga');
    }
}



function* graphsSaga() {
    yield takeLatest('FETCH_GRAPH_DATA', getAllGraph)
    yield takeLatest('FETCH_FILTERED_GRAPH', getFilteredGraph)
}

export default graphsSaga;