import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getAllGraph () {
    
}





function* graphsSaga() {
    yield takeLatest('FETCH_GRAPH_DATA', getAllGraph)
}

export default graphsSaga;