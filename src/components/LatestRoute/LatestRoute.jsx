import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';


// material ui
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

function IndividualRoute() {

    const dispatch = useDispatch();
    const history = useHistory();
    const latestRoute = useSelector(store => store.routes.latestRoute);

    const handleAddAnother = () => {
        history.push('/routes/grades');
    }

    const handleViewList = () => {
        history.push('/routes/list')
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
        paper: {
            // background: '#adc2cd',
            width: 300,
            padding: theme.spacing(0.5),
        },
    }));

    const classes = useStyles();

    return (
        <>
            <Grid container justify="center" className={classes.paperParent}>
                <Paper elevation={3} className={classes.paper}>
                    <Grid container>
                        <Grid item xs={12} className={classes.header}>
                            <Typography variant="h5">Route Added!</Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.subhead}>
                            {latestRoute.date &&
                                <Typography variant="subtitle1">{format(new Date(latestRoute.date), 'MMMM do, yyyy')}</Typography>
                            }
                        </Grid>
                        <Grid item xs={6} className={classes.root}>
                            <Typography variant="h6">Grade: {latestRoute.grade}</Typography>
                        </Grid>
                        <Grid item xs={6} className={classes.root}>
                            {/* <Typography variant="h6">{route.sent ? ' Sent' : ' Project'}</Typography> */}
                            {latestRoute.sent &&
                                <Typography variant="h6">{latestRoute.flash && latestRoute.sent ? 'Flashed' : 'Sent (no flash)'}</Typography>
                            }
                            {!latestRoute.sent &&
                                <Typography variant="h6">Project</Typography>
                            }
                        </Grid>
                        <Grid item xs={6} className={classes.root}>
                            <Typography variant="h6">{latestRoute.angle}</Typography>
                        </Grid>
                        <Grid item xs={6} className={classes.root}>
                            <Typography variant="h6">{latestRoute?.rope_type}</Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.root}>
                            <Typography variant="h6">Main hold type: {latestRoute.type}</Typography>
                        </Grid>
                        {latestRoute.notes &&
                            <Grid item xs={12} className={classes.root}>
                                <Typography variant="h6">Notes: {latestRoute.notes}</Typography>
                            </Grid>
                        }
                        <Grid item xs={12} className={classes.root}>
                            {latestRoute.image &&
                                <div>
                                    <p>Image</p>
                                    <img src={latestRoute.image} width="300" height="300"></img>
                                </div>
                            }
                        </Grid>
                        <Grid item xs={12} className={classes.root}>
                            {/* <Button onClick={handleAddAnother} variant="contained" color="primary">Add Another Route</Button> */}
                            <Button onClick={handleViewList} variant="contained" color="primary">View Routes List</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </>
    )
}

export default IndividualRoute;