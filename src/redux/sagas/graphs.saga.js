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
        yield put({ type: 'SET_ALL_GRAPH', payload: forGraph.data })

    } catch {
        console.log('error in getFilteredGraph saga');
    }
}

// function* getSentGraph (action) {
//     console.log('in getSentGraph saga');

//     try {
//         yield put({ type: 'CLEAR_ALL_GRAPH'});
//         const forGraph = yield axios.get(`/api/routes/graph`, {params: action.payload});
//         yield put({ type: 'SET_ALL_GRAPH', payload: forGraph.data })

//     } catch {
//         console.log('error in getAllRoutes saga');
//     }
// }

function* graphsSaga() {
    yield takeLatest('FETCH_GRAPH_DATA', getAllGraph)
    yield takeLatest('FETCH_FILTERED_GRAPH', getFilteredGraph)
    // yield takeLatest('FETCH_SENT_GRAPH', getSentGraph)
}

export default graphsSaga;