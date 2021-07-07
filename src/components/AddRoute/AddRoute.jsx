import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import 'date-fns';

// material ui
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';

function AddRoute() {

    const history = useHistory();
    const dispatch = useDispatch();
    const { grading } = useParams();
    // const [gradeScheme, setGradeScheme] = useState('ysd');
    const grades = useSelector(store => store.addRouteOptions.gradesReducer)

    // const createdRouteId = useSelector(store => store.id);

    // local states for all inputs
    const [grade, setGrade] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date('2021-06-18T11:11:54'));
    const [sendStatus, setSendStatus] = useState('true');
    const [rope, setRope] = useState('1');
    const [wall, setWall] = useState('1');
    const [hold, setHold] = useState('1');
    const [flash, setFlash] = useState('true');
    const [notes, setNotes] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        dispatch({
            type: 'FETCH_FORM_OPTIONS',
        });
        dispatch({
            type: 'FETCH_GRADE_SCHEME',
            payload: {
                gradeScheme: grading,
            }
        })
        if (grading == 'french') {
            setGrade('39');
            console.log('in if statement log grading', grading);
        }
    }, []);

    // sends added route info as post
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({
            type: 'ADD_ROUTE',
            payload: {
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
        setGrade('1');
        setNotes('');
        setImage('');
        // console.log('in add route file');
        history.push(`/routes/latest`);
    }

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    // moves user back to grade scheme selection
    const handleCancel = () => {
        history.push('/routes/grades');
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
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }));

    const classes = useStyles();

    const [sendStatusChip, setSendStatusChip] = useState([
        { key: true, label: 'sent', disabled: false },
        { key: false, label: 'project', disabled: false },
    ]);

    const handleClick = (chipToChoose) => () => {
        setSendStatusChip((chips) => chips.filter((chip) => chip.label === chipToChoose.label));
        console.log('log sendStatusChip', sendStatusChip);
        setSendStatus(chipToChoose.key);
        console.log('log chipToChoose', chipToChoose);
    }

    return (
        <>
            <Grid container>
                <form onSubmit={handleSubmit} className={classes.root}>
                    <Grid container justify="center">
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
                        {/* <label htmlFor="sent">Send status:</label>
                    <select onChange={(event) => { setSendStatus(event.target.value) }} value={sendStatus} name="sent" id="sent">
                        <option value="true">sent</option>
                        <option value="false">project</option>
                    </select> */}
                        <Grid item xs={12}>
                            <div className={classes.root}>
                                {sendStatusChip.map((data) => {
                                    return (
                                        <span key={data.key}>
                                            <Chip
                                                label={data.label}
                                                onClick={handleClick(data)}
                                                className={classes.chip}
                                                disabled={data.disabled}
                                            />
                                        </span>
                                    );
                                })}
                            </div>
                        </Grid>
                        <Grid item xs={12} className={classes.root}>
                            <label htmlFor="rope">Type of climb:</label>
                            <select onChange={(event) => { setRope(event.target.value) }} value={rope} name="rope" id="rope">
                                <option value="1">top rope</option>
                                <option value="2">lead</option>
                                <option value="3">autobelay</option>
                            </select>
                        </Grid>
                        <Grid item xs={12} className={classes.root}>
                            <label htmlFor="wall">Wall angle:</label>
                            <select onChange={(event) => { setWall(event.target.value) }} value={wall} name="wall" id="wall">
                                <option value="1">slab</option>
                                <option value="2">vertical</option>
                                <option value="3">overhang</option>
                            </select>
                        </Grid>
                        <Grid item xs={12} className={classes.root}>
                            <label htmlFor="hold">Main hold type:</label>
                            <select onChange={(event) => { setHold(event.target.value) }} value={hold} name="hold" id="hold">
                                <option value="1">crimps</option>
                                <option value="2">slopers</option>
                                <option value="3">jugs</option>
                                <option value="4">pinches</option>
                            </select>
                        </Grid>
                        <Grid item xs={12} className={classes.root}>
                            <label htmlFor="flash">Flashed?</label>
                            <select onChange={(event) => { setFlash(event.target.value) }} value={flash} name="flash" id="flash">
                                <option value="true">yes</option>
                                <option value="false">no</option>
                            </select>
                        </Grid>
                        <Grid item xs={12} className={classes.root}>
                        <TextField onChange={(event) => { setNotes(event.target.value) }} value={notes} id="outlined-basic" label="notes" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} className={classes.root}>
                        <TextField onChange={(event) => { setImage(event.target.value) }} value={image} id="outlined-basic" label="image url" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} className={classes.root}>
                        <Button onClick={handleCancel} variant="contained" color="secondary">Cancel</Button>
                        <Button type="submit" variant="contained" color="primary">
                            Done
                        </Button>
                        </Grid>
                    </Grid>
                </form>
                
            </Grid>
        </>
    )
}

export default AddRoute;