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





function* graphsSaga() {
    yield takeLatest('FETCH_GRAPH_DATA', getAllGraph)
}

export default graphsSaga;