import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function RouteDetails () {

    const dispatch = useDispatch();

    const oneRoute = useSelector(store => store.routes.oneRoute);

    const {id} = useParams();

    useEffect(() => {
        dispatch({
            type: 'FETCH_ONE_ROUTE',
            payload: {id: id}
        })
    }, []);

    return(
        <>
            <h1>{oneRoute.grade}</h1>
            <h2>Hello</h2>
        </>
    )
}

export default RouteDetails;