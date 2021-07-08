import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

// material ui
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';


function GraphForm() {

    const dispatch = useDispatch();

    const store = useSelector((store) => store);
    const ropes = useSelector(store => store.formOptions.ropeReducer)
    const walls = useSelector(store => store.formOptions.wallReducer)
    const holds = useSelector(store => store.formOptions.holdReducer)

    const [sendStatus, setSendStatus] = useState('');
    const [rope, setRope] = useState('');
    const [wall, setWall] = useState('');
    const [hold, setHold] = useState('');
    const [flash, setFlash] = useState('');
    const [open, setOpen] = useState(false);

    const { grading } = useParams();

    const [heading, setHeading] = useState('Functional Component');

    useEffect(() => {
        dispatch({
                type: 'FETCH_FORM_OPTIONS'
            })
    }, []);

    // opens dialog form for sent/project selection
    const handleFilter = () => {
        setOpen(true);
    }

    // close dialog form without action
    const handleFilterCancel = () => {
        setOpen(false);
    }

    // on click of Filter button inside of form dialog, send info to server/db to grab selected routes
    const handleFilterChoices = () => {
        if (sendStatus == 'error') {
            alert('Please choose what type of routes to see!');
        } else {
            dispatch({
                type: 'FETCH_FILTERED_GRAPH',
                payload: {
                    gradeScheme: grading,
                    sent: sendStatus,
                    rope_type_id: rope,
                    wall_id: wall,
                    holds_id: hold,
                    flash: flash,
                }
            })
            setOpen(false);
            setFilterChip([
                { key: 'true', label: 'sent' },
                { key: 'false', label: 'project' },
            ])
        }
    }

    const [filterChip, setFilterChip] = useState([
        { key: 'true', label: 'sent' },
        { key: 'false', label: 'project' },
    ]);

    const handleChipClick = (chipToChoose) => () => {
        setFilterChip((chips) => chips.filter((chip) => chip.label === chipToChoose.label));
        // console.log('log sendStatusChip', sendStatus);
        setSendStatus(chipToChoose.key);
        console.log('log chipToChoose', chipToChoose);
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
        formControl: {
            margin: theme.spacing(1),
            minWidth: 130,
        },
    }));

    const classes = useStyles();

    return (
        <div>
            <Button onClick={handleFilter}>Filter Routes</Button>
            <Dialog open={open} onClose={handleFilterCancel} aria-labelledby="form-dialog-title">
                <DialogContent>
                    <DialogContentText>
                        Choose route filters. You may choose any combination of filters.
                    </DialogContentText>
                    <div>
                        {filterChip.map((data) => {
                            return (
                                <span key={data.key}>
                                    <Chip
                                        label={data.label}
                                        onClick={handleChipClick(data)}
                                        className={classes.chip}
                                    />
                                </span>
                            );
                        })}
                    </div>
                    <Grid item xs={12} className={classes.root}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="ropes">Climb Type</InputLabel>
                            <Select onChange={(event) => { setRope(event.target.value) }} defaultValue="choose type" value={rope} labelId="ropes" id="ropes">
                                {ropes.map(rope => (
                                    <MenuItem key={rope.id} value={rope.id}>{rope.type}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} className={classes.root}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="walls">Wall Angle</InputLabel>
                            <Select onChange={(event) => { setWall(event.target.value) }} defaultValue="choose angle" value={wall} labelId="walls" id="walls">
                                {walls.map(wall => (
                                    <MenuItem key={wall.id} value={wall.id}>{wall.angle}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} className={classes.root}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="holds">Main Hold Type</InputLabel>
                            <Select onChange={(event) => { setHold(event.target.value) }} defaultValue="choose main hold type" value={hold} labelId="holds" id="holds">
                                {holds.map(hold => (
                                    <MenuItem key={hold.id} value={hold.id}>{hold.type}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} className={classes.root}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="flash">Flashed?</InputLabel>
                            <Select onChange={(event) => { setFlash(event.target.value) }} defaultValue="flash?" value={flash} labelId="flash" id="flash">
                                <MenuItem value='false'>no</MenuItem>
                                <MenuItem value='true'>yes</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleFilterCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleFilterChoices} color="primary">
                        Filter
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default GraphForm;