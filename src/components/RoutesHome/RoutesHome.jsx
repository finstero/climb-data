import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

// material ui
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';

function RoutesHome() {

    const history = useHistory();

    const [open, setOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [gradeScheme, setGradeScheme] = useState('error');

    const handleAdd = () => {
        setOpen(true);
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
        chip: {
            margin: theme.spacing(0.5),
        },
    }));

    const classes = useStyles();

    const [chipData, setChipData] = useState([
        { key: 'ysd', label: 'Yosemite Decimal System' },
        { key: 'ysd_simple', label: 'Yosemite Decimal System - Simple' },
        { key: 'french', label: 'French' },
    ]);

    const handleGradeSchemeSelection = (chipToChoose) => () => {
        setChipData((chips) => chips.filter((chip) => chip.key == chipToChoose.key));
        // console.log('log chipToChoose', chipToChoose.key);
        setGradeScheme(chipToChoose.key);
    }

    const handleCancel = () => {
        setOpen(false);
        setGradeScheme('error');
    }

    const handleContinue = (event) => {
        event.preventDefault();
        if (gradeScheme == 'error') {
            setAlertOpen(true);
        }
        else {
            history.push(`/routes/add/${gradeScheme}`);
        }
    }

    const handleCloseAlert = (event) => {
        event.preventDefault();
        setAlertOpen(false);
    }


    return (
        <>
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

            {/* Dialog for grade scheme pop up */}
            <Dialog open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
                <DialogContent>
                    <DialogContentText>
                        What grade scheme are you using?
                    </DialogContentText>
                    <div className={classes.root}>
                        {chipData.map((data) => {
                            return (
                                <span key={data.key}>
                                    <Chip
                                        label={data.label}
                                        onClick={handleGradeSchemeSelection(data)}
                                        className={classes.chip}
                                    />
                                </span>
                            );
                        })}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} variant="contained" color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleContinue} variant="contained" color="primary">
                        Continue
                    </Button>
                </DialogActions>
            </Dialog>

            {/* DIALOG FOR ALERT */}
            <Dialog
                open={alertOpen}
                onClose={handleCloseAlert}
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Please choose a grade scheme.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAlert} color="primary" variant="contained" autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default RoutesHome;