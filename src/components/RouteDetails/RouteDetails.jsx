import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

// material ui
import Button from '@material-ui/core/Button';

function RouteDetails() {

    const dispatch = useDispatch();
    const history = useHistory();
    const route = useSelector(store => store.routes.oneRoute);

    const { id } = useParams();

    // loads selected route on page refresh
    useEffect(() => {
        dispatch({
            type: 'FETCH_ONE_ROUTE',
            payload: { id: id }
        })
    }, []);

    // deletes single route
    const handleDelete = () => {
        dispatch({
            type: 'DELETE_ROUTE',
            payload: { id: id }
        })
    }

    const handleEdit = () => {

    }

    const handleBack = () => {
        history.goBack();
    }

    return (
        <>
            <h1>{route?.date?.slice(0,10)}</h1>
            <p>Grade: {route.grade}</p>
            <p>Climb type: {route.rope_type}</p>
            <p>Wall angle: {route.angle}</p>
            <p>Flash: {route.flash}</p>
            <p>Sent: {route.sent}</p>
            <p>Main hold type: {route.type}</p>
            <p>Notes: {route.notes}</p>
            <p>Image: {route.image}</p>
            <Button onClick={handleDelete}>Delete</Button>
            <Button onClick={handleEdit}>Edit</Button>
            <Button onClick={handleBack}>Back</Button>
        </>
    )
}

export default RouteDetails;