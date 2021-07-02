import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
// import RouteListItem from '../RouteListItem/RouteListItem';


function RoutesList() {

    const dispatch = useDispatch();
    const history = useHistory();

    const allRoutes = useSelector(store => store.routes.allRoutes);

    const handleRouteClick = (route) => {
        console.log('clicked');
        // dispatch({
        //     type: 'FETCH_ONE_ROUTE',
        //     payload: {id: route.id}
        // })
        history.push(`/routes/details/${route.id}`)
    }

    useEffect(() => {
        dispatch({
            type: 'FETCH_ALL_ROUTES'
        })
    }, []);

    return (
        <>
            <ul>
                {allRoutes.map(route => (
                    <li key={route.id} onClick={() => handleRouteClick(route)}>{route.grade}, {route.date.slice(0, 10)}, {route.type}</li>
                ))}
            </ul>
        </>
    )
}

export default RoutesList;