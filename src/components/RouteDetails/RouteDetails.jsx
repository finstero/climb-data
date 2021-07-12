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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function RouteDetails() {

    const dispatch = useDispatch();
    const history = useHistory();
    const route = useSelector(store => store.routes.oneRoute);

    const { id } = useParams();

    const [open, setOpen] = useState(false);

    // loads selected route on page load
    useEffect(() => {
        dispatch({
            type: 'FETCH_ONE_ROUTE',
            payload: { id: id }
        });
    }, []);

    // deletes single route
    const handleDelete = (event) => {
        event.preventDefault();
        dispatch({
            type: 'DELETE_ROUTE',
            payload: { id: id }
        })
        history.push('/routes/list')
    }

    const handleDeleteConfirmation = () => {
        setOpen(true);
    }

    const handleDeleteCancel = () => {
        setOpen(false);
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
        paperParent: {
            padding: theme.spacing(3), 
        },
        header: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            margin: 0,
            paddingTop: theme.spacing(1),
        },
        subhead: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
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
        paper: {
            // background: '#adc2cd',
            width: 300,
            padding: theme.spacing(0.5),
        },
    }));

    // classes passed to child, EditRouteForm
    const classes = useStyles();

    return (
        <>
            <Grid container justify="center" className={classes.paperParent}>
                <Paper elevation={3} className={classes.paper}>
                    <Grid container>
                        <Grid item xs={12} className={classes.header}>
                            <Typography variant="h5">Route Details</Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.subhead}>
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
                        <Grid item xs={12} className={classes.root}>
                            {route.image &&
                                <div>
                                    <img src={route.image} width="300" height="300"></img>
                                </div>
                            }
                        </Grid>
                        <Grid item xs={12} className={classes.root}>
                            <Button onClick={handleBack} variant="contained" color="primary">Back</Button>
                            <Button onClick={handleDeleteConfirmation} variant="contained" color="secondary">Delete</Button>
                            <EditRouteForm classes={classes} />
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>

{/* DIALOG FOR DELETE CONFIRMATION */}
            <Dialog
                open={open}
                onClose={handleDeleteCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Are you sure you want to delete this route?</DialogTitle>
                <DialogActions>
                    <Button onClick={handleDeleteCancel} variant="contained" color="secondary">
                        Oops, no
                    </Button>
                    <Button onClick={handleDelete} variant="contained" color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default RouteDetails;