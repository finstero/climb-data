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
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';

// material ui classes passed down for styling
function EditRouteForm({ classes }) {

    const dispatch = useDispatch();

    const ropes = useSelector(store => store.formOptions.ropeReducer)
    const walls = useSelector(store => store.formOptions.wallReducer)
    const holds = useSelector(store => store.formOptions.holdReducer)
    const grades = useSelector(store => store.formOptions.gradesReducer)
    const route = useSelector(store => store.routes.oneRoute);

    const [grade, setGrade] = useState('1');
    const [selectedDate, setSelectedDate] = useState(new Date('2021-06-18T11:11:54'));
    const [sendStatus, setSendStatus] = useState('');
    const [rope, setRope] = useState('');
    const [wall, setWall] = useState('');
    const [hold, setHold] = useState('');
    const [flash, setFlash] = useState('');
    const [open, setOpen] = useState(false);
    const [gradeScheme, setGradeScheme] = useState('');
    const [notes, setNotes] = useState('');
    const [image, setImage] = useState('');


    const { id } = useParams();

    useEffect(() => {
        dispatch({
            type: 'FETCH_FORM_OPTIONS'
        })
    }, []);

    // opens dialog form for sent/project selection
    const handleEdit = () => {
        dispatch({
            type: 'FETCH_GRADE_SCHEME',
            payload: {
                gradeScheme: route.grades_type,
            }
        })
        setGrade(route.grades_id);
        setSelectedDate(route.date);
        setSendStatus(route.sent);
        setRope(route.rope_type_id);
        setWall(route.wall_id);
        setHold(route.holds_id);
        setFlash(route.flash);
        setNotes(route.notes);
        setOpen(true);
    }

    // close dialog form without action
    const handleEditCancel = () => {
        setOpen(false);
        setRope('');
        setHold('');
        setWall('');
    }

    // on click of Filter button inside of form dialog, send info to server/db to grab selected routes
    const handleSave = (event) => {
        event.preventDefault();
        if (sendStatus == 'error') {
            alert('Please choose at least one filter!');
        } else {
            dispatch({
                type: 'EDIT_ROUTE',
                payload: {
                    id: id,
                    grades_id: grade,
                    date: selectedDate,
                    sent: sendStatus,
                    rope_type_id: rope,
                    wall_id: wall,
                    holds_id: hold,
                    flash: flash,
                    notes: notes,
                    image: image
                }
            })
            setOpen(false);
            setRope('');
            setHold('');
            setWall('');
        }
    }

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div>
            <Button onClick={handleEdit}>Edit</Button>
            <Dialog open={open} onClose={handleEditCancel} aria-labelledby="form-dialog-title">
                <DialogContent>
                    <DialogContentText>
                        Edit!
                    </DialogContentText>
                    <Grid item xs={12} className={classes.root}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="grades">Grade</InputLabel>
                            <Select onChange={(event) => { setGrade(event.target.value) }} defaultValue="choose grade" value={grade} labelId="grades" id="grades">
                                {grades.map(grade => (
                                    <MenuItem key={grade.id} value={grade.id}>{grade.grade}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} className={classes.root}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="sendStatus">Send Status</InputLabel>
                            <Select onChange={(event) => { setSendStatus(event.target.value) }} defaultValue="sent?" value={sendStatus} labelId="sendStatus" id="sendStatus">
                                    <MenuItem key={1} value={false}>project</MenuItem>
                                    <MenuItem key={2} value={true}>sent</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justify="space-around">
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="Date"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </Grid>
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
                    <Grid item xs={12} className={classes.root}>
							<TextField onChange={(event) => { setNotes(event.target.value) }} value={notes} id="notes" label="notes" variant="outlined" />
						</Grid>
						<Grid item xs={12} className={classes.root}>
							<TextField onChange={(event) => { setImage(event.target.value) }} value={image} id="image" label="image url" variant="outlined" />
						</Grid>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default EditRouteForm;