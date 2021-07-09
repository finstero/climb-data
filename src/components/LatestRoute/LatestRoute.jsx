import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';


// material ui
import Button from '@material-ui/core/Button';

function IndividualRoute() {

    const dispatch = useDispatch();
    const history = useHistory();
    // const { id } = useParams();
    const latestRoute = useSelector(store => store.routes.latestRoute);

    // useEffect(() => {
    //     dispatch({
    //         type: 'FETCH_ROUTE',
    //     })
    // }, []);

    const handleViewGraph = () => {
        history.push('/routes/graph')
    }

    const handleViewList = () => {
        history.push('/routes/list')
    }

    return (
        <>
            <h2>Route Added!</h2>
            {latestRoute.map(route => (
                <div key={route.id}>
                    {route.date &&
                        <h3>{format(new Date(route?.date), 'MMMM do, yyyy')}</h3>
                    }
                    <p>Grade: {route.grade}</p>
                    <p>Climb type: {route.rope_type}</p>
                    <p>Wall angle: {route.angle}</p>
                    <p>Flash: {route.flash ? ' yes' : ' no'}</p>
                    <p>Sent: {route.sent ? ' yes' : ' no'}</p>
                    <p>Main hold type: {route.type}</p>
                    <p>Notes: {route.notes}</p>
                    <p>Image: {route.image}</p>
                </div>
            ))}
            {/* <Button>Delete</Button>
            <Button>Edit</Button> */}
            <Button onClick={handleViewGraph}>View Routes Graph</Button>
            <Button onClick={handleViewList}>View Routes List</Button>
        </>
    )
}

export default IndividualRoute;