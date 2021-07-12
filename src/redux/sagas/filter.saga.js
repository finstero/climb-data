import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getFilteredSelections (action) {
    console.log('in filter saga', action.payload);

    try {
        // yield put({ type: 'CLEAR_ALL_GRAPH'});
        const forFilterDisplay = yield axios.get(`/api/routes/filterdisplay`, {params: action.payload});
        yield put({ type: 'SET_GRAPH_FILTER_DISPLAY', payload: forFilterDisplay.data });
    } catch {
        console.log('error in filter saga');
    }
}

export default filterSaga;