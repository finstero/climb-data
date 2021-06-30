import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';


function RoutesList () {

    const dispatch = useDispatch();

    const allRoutes = useSelector(store => store.routes.allRoutes);


useEffect(() => {
    dispatch({
        type: 'FETCH_ALL_ROUTES'
    })
})

    return(
        <>
            <ul>
                {allRoutes.map(route => (
                    <li>{route.grade}, {route.date.slice(0,10)}, {route.type}</li>
                ))}
            </ul>
        </>
    )
}

export default RoutesList;