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
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

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
            padding: theme.spacing(1),
            margin: 0,
        },
        chip: {
            margin: theme.spacing(0.5),
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 130,
        },
        paper: {
            // background: '#adc2cd',
            width: 300,
        },
    }));

    // classes passed to child, EditRouteForm
    const classes = useStyles();


    return (

        <Grid container justify="center">
            <Paper elevation={3} className={classes.paper}>
                <Grid container>
                    <Grid item xs={12} className={classes.root}>
                        <Typography variant="h5">Route Details</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.root}>
                        {route.date &&
                            <Typography variant="subtitle1">{format(new Date(route.date), 'MMMM do, yyyy')}</Typography>
                        }
                    </Grid>
                    <Grid item xs={6} className={classes.root}>
                        <Typography variant="h6">Grade: {route.grade}</Typography>
                    </Grid>
                    <Grid item xs={6} className={classes.root}>
                        {/* <Typography variant="h6">{route.sent ? ' Sent' : ' Project'}</Typography> */}
                        {route.sent &&
                            <Typography variant="h6">{route.flash && route.sent ? 'Flashed' : 'Sent (no flash)'}</Typography>
                        }
                        {!route.sent &&
                            <Typography variant="h6">Project</Typography>
                        }
                    </Grid>
                    <Grid item xs={6} className={classes.root}>
                        <Typography variant="h6">{route.angle}</Typography>
                    </Grid>

                        <Grid item xs={6} className={classes.root}>
                            <Typography variant="h6">{route?.rope_type}</Typography>
                        </Grid>
                    

                    <Grid item xs={12} className={classes.root}>
                        <Typography variant="h6">Main hold type: {route.type}</Typography>
                    </Grid>
                    {route.notes &&
                        <Grid item xs={12} className={classes.root}>
                            <Typography variant="h6">Notes: {route.notes}</Typography>
                        </Grid>
                    }
                    {/* <p>Image: {route.image}</p> */}
                    <Grid item xs={12} className={classes.root}>
                        {route.image &&
                            <div>
                                <p>Image</p>
                                <img src={route.image} width="300" height="300"></img>
                            </div>
                        }
                    </Grid>
                    <Grid item xs={12} className={classes.root}>
                        <Button onClick={handleDelete} variant="contained" color="secondary">Delete</Button>
                        <Button onClick={handleBack} variant="contained" color="primary">Back</Button>
                        <EditRouteForm classes={classes} />
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default RouteDetails;