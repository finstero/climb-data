import { allRoutes } from './routes.reducer.js';


// test SET_USER
// test UNSET_USER
// test other action
// test initial value

describe('allRoutes REDUCER TESTS', () => {

    test('SET_ALL_ROUTES', () => {
        const action = {
            type: 'SET_ALL_ROUTES',
            payload: [{
                id: 42,
                grade: '5.6',
                rope_type: 'Top Rope'
            },
            {
                id: 45,
                grade: '5.9',
                rope_type: 'Lead'
            }]
        };

        const state = [];

        expect(allRoutes(state, action)).toEqual([{
            id: 42,
            grade: '5.6',
            rope_type: 'Top Rope'
        },
        {
            id: 45,
            grade: '5.9',
            rope_type: 'Lead'
        }])
    });

    test('CLEAR_ALL_ROUTES', () => {
        const action = { type: 'CLEAR_ALL_ROUTES' }
        const state = [];

        expect(allRoutes(state, action)).toEqual([])
    });

})