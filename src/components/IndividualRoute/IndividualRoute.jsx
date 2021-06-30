import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';


// material ui
import Button from '@material-ui/core/Button';

function IndividualRoute() {

    const dispatch = useDispatch();
    const history = useHistory();
    const latestRoute = useSelector(store => store.routes.latestRoute);

    // useEffect(() => {
    //     dispatch({
    //         type: 'FETCH_ROUTE',
    //     })
    // }, []);

    const handleBack = () => {
        history.goBack();
    }

    return (
        <>
            <h2>Last Route Added</h2>
            {latestRoute.map(route => (
                <div key={route.id}>
                    <h3>{route.date}</h3>
                    <p>Grade: {route.grade}</p>
                    <p>Climb type: {route.angle}</p>
                    <p>Flash: {route.flash}</p>
                    <p>Sent: {route.sent}</p>
                    <p>Main hold type: {route.type}</p>
                    <p>Notes: {route.notes}</p>
                    <p>Image: {route.image}</p>
                </div>
            ))}
            <Button>Delete</Button>
            <Button>Edit</Button>
            <Button>View Routes Graph</Button>
            <Button onClick={handleBack}>Back</Button>
        </>
    )
}

export default IndividualRoute;