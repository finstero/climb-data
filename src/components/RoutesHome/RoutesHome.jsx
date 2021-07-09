import { useHistory } from 'react-router-dom';

// material ui
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

function RoutesHome() {

    const history = useHistory();

    const handleAdd = () => {
        history.push('/routes/grades');
    }

    const handleViewRoutes = () => {
        history.push('/routes/list');
    }

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            padding: theme.spacing(0.5),
            margin: 0,
        },
    }));

    const classes = useStyles();

    return (
        <Grid container className={classes.root}>
            <Grid item xs={12}>
                <div onClick={handleAdd} className={classes.root}>
                    <h1>ADD</h1>
                    <img src="https://karstclimbingkrabi.com/wp-content/uploads/2019/10/Railay_Rock_Climbing_Lead_Course-1024x683.jpg" width="300" height="175"></img>
                </div>
            </Grid>
            <Grid item xs={12}>
                <div onClick={handleViewRoutes} className={classes.root}>
                    <h1>VIEW ROUTES</h1>
                    <img src="https://thumbs.cartowall.com/api/image/69d4be50-26bb-11e8-8912-afb644dc7dac.jpg" width="300" height="175"></img>
                </div>
            </Grid>
        </Grid>
    )
}

export default RoutesHome;