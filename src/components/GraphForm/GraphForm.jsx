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
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';


// GRAPHFORM USED FOR BOTH GRAPH FILTER AND ROUTES LIST FILTER
// props: material ui classes passed down for styling
function GraphForm({ classes, dispatchType }) {

    const dispatch = useDispatch();

    const ropes = useSelector(store => store.formOptions.ropeReducer)
    const walls = useSelector(store => store.formOptions.wallReducer)
    const holds = useSelector(store => store.formOptions.holdReducer)

    const [sendStatus, setSendStatus] = useState('');
    const [rope, setRope] = useState('');
    const [wall, setWall] = useState('');
    const [hold, setHold] = useState('');
    const [flash, setFlash] = useState('');
    const [open, setOpen] = useState(false);
    const [gradeScheme, setGradeScheme] = useState('');
    const [gradeInput, setGradeInput] = useState(false);

    const { grading } = useParams();

    useEffect(() => {
        dispatch({
            type: 'FETCH_FORM_OPTIONS'
        })
    }, []);

    // opens dialog form for sent/project selection
    const handleFilter = () => {
        if (grading == undefined) {
            setGradeInput(true);
        }
        setOpen(true);
    }

    // close dialog form without action
    const handleFilterCancel = () => {
        setOpen(false);
        setGradeChip(gradeChipDefault);
        setFilterChip(sentFilterChips);
        setSendStatus('');
        setRope('');
        setHold('');
        setWall('');
        setFlash('');
    }

    const sentFilterChips = [
        { key: 'true', label: 'sent' },
        { key: 'false', label: 'project' },
    ];

    // on click of Filter button inside of form dialog, send info to server/db to grab selected routes
    const handleFilterChoices = () => {
        console.log('logging sendStatus', sendStatus);
        // if (sendStatus == '') {
        //     alert('Please choose at least one filter!');
        // } else {
            // grading will be undefined if user is filtering for list view
            if (grading == undefined) {
                dispatch({
                    type: dispatchType.type,
                    payload: {
                        gradeScheme: gradeScheme,
                        sent: sendStatus,
                        rope_type_id: rope,
                        wall_id: wall,
                        holds_id: hold,
                        flash: flash,
                    }
                })
                // ELSE for filtering main graph
            } else {
                console.log('grading for filter form', grading);
                dispatch({
                    type: dispatchType.type,
                    payload: {
                        gradeScheme: grading,
                        sent: sendStatus,
                        rope_type_id: rope,
                        wall_id: wall,
                        holds_id: hold,
                        flash: flash,
                    }
                });
                // dispatch({
                //     type: dispatchType.filter,
                //     payload: {
                //         status: true,
                //         sent: sendStatus,
                //         rope_type_id: rope,
                //         wall_id: wall,
                //         holds_id: hold,
                //         flash: flash,
                //     }
                // });
            }
            setOpen(false);
            setGradeChip(gradeChipDefault);
            setFilterChip(sentFilterChips);
            setGradeScheme('');
            setSendStatus('');
            setRope('');
            setHold('');
            setWall('');
            setFlash('');
        // }
    }

    const [filterChip, setFilterChip] = useState(sentFilterChips);

    const handleChipClick = (chipToChoose) => () => {
        setFilterChip((chips) => chips.filter((chip) => chip.label === chipToChoose.label));
        setSendStatus(chipToChoose.key);
        // console.log('log chipToChoose', chipToChoose);
    }

    // setting up grade scheme chips
    const gradeChipDefault = [
        { key: 'ysd', label: 'Yosemite Decimal System' },
        { key: 'ysd_simple', label: 'Yosemite Decimal System - Simple' },
        { key: 'french', label: 'French' },
    ];

    const [gradeChip, setGradeChip] = useState(gradeChipDefault);

    // on click of grade scheme chip, disappears un selected chips and sets grade scheme to chosen grade scheme for dispatch
    const handleGradeChip = (chipToChoose) => () => {
        setGradeChip((chips) => chips.filter((chip) => chip.key == chipToChoose.key));
        console.log('log chipToChoose', chipToChoose.key);
        setGradeScheme(chipToChoose.key);
    }

    return (
        <div>
            <Button onClick={handleFilter} variant="contained" color="primary">Filter Routes</Button>
            <Dialog open={open} onClose={handleFilterCancel} aria-labelledby="form-dialog-title">
                <DialogContent>
                    <DialogContentText>
                        Choose route filters. You may choose any combination of filters.
                    </DialogContentText>
                    {gradeInput &&
                        <ul className={classes.root}>
                        {gradeChip.map((data) => {
                            return (
                                <li key={data.key}>
                                    <Chip
                                        label={data.label}
                                        onClick={handleGradeChip(data)}
                                        className={classes.chip}
                                        disabled={false}
                                    />
                                </li>
                            );
                        })}
                        </ul>
                    }
                    <div className={classes.root}>
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
                    <Button onClick={handleFilterCancel} variant="contained" color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleFilterChoices} variant="contained" color="primary">
                        Filter
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default GraphForm;