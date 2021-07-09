import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { format } from 'date-fns';

// components
import EditRouteForm from '../EditRouteForm/EditRouteForm';

// material ui
import Button from '@material-ui/core/Button';
import 'date-fns';
import { makeStyles } from '@material-ui/core/styles';

function RouteDetails() {

    const dispatch = useDispatch();
    const history = useHistory();
    const route = useSelector(store => store.routes.oneRoute);

    const { id } = useParams();

    // loads selected route on page load
    useEffect(() => {
        dispatch({
            type: 'FETCH_ONE_ROUTE',
            payload: { id: id }
        });
    }, []);

    // deletes single route
    const handleDelete = () => {
        dispatch({
            type: 'DELETE_ROUTE',
            payload: { id: id }
        })
        history.push('/routes/list')
    }

    // moves user back to list view
    const handleBack = () => {
        history.push('/routes/list');
    }

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            listStyle: 'none',
            padding: theme.spacing(0.5),
            margin: 0,
        },
        chip: {
            margin: theme.spacing(0.5),
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 130,
        },
    }));

    // classes passed to child, EditRouteForm
    const classes = useStyles();

    return (

        <div>
            {route.date &&
                <h3>{format(new Date(route?.date), 'MMMM do, yyyy')}</h3>
            }
            <p>Grade: {route.grade}</p>
            <p>Climb type: {route.rope_type}</p>
            <p>Wall angle: {route.angle}</p>
            <p>Flash:
                {route.flash ? ' yes' : ' no'}
            </p>
            <p>Sent: {route.sent ? ' sent' : ' project'}</p>
            <p>Main hold type: {route.type}</p>
            <p>Notes: {route.notes}</p>
            {/* <p>Image: {route.image}</p> */}
            {route.image &&
            <div>
                <p>Image</p>
                <img src={route.image} width="300" height="300"></img>
            </div>
            }
            <Button onClick={handleDelete} variant="contained" color="primary">Delete</Button>
            <Button onClick={handleBack} variant="contained" color="primary">Back</Button>
            <EditRouteForm classes={classes} />
        </div>
    )
}

export default RouteDetails;