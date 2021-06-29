import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

// material ui
import Button from '@material-ui/core/Button';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';

function AddRoute() {

    const history = useHistory();
    const dispatch = useDispatch();
    const [gradeScheme, setGradeScheme] = useState('ysd');
    const [grade, setGrade] = useState('1');
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
            type: 'FETCH_ADD_OPTIONS',
            payload: {
                gradeScheme: gradeScheme,
            }
        })
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({
            type: 'ADD_ROUTE',
            payload: {
                ysd_id: grade,
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
    }

    const handleDateChange = (date) => {

        setSelectedDate(date);
    };

    const handleCancel = () => {
        history.push('/routes/home')
    }

    const grades = useSelector(store => store.addRouteOptions.gradesReducer)

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="grades-scheme">Grading scheme:</label>
                <select onChange={(event) => { setGradeScheme(event.target.value) }} value={gradeScheme} name="grades-scheme" id="grades-scheme">
                    <option value="ysd">yosemite decimal system</option>
                    <option value="ysd_simple">yosemite decimal system - simple</option>
                    <option value="french">french</option>
                </select>
                <label htmlFor="grades">Choose a grade:</label>
                <select onChange={(event) => { setGrade(event.target.value) }} value={grade} name="grades" id="grades">
                    {grades.map(grade => (
                        <option key={grade.id} value={grade.id}>{grade.grade}</option>
                    ))}
                </select>
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
                <label htmlFor="sent">Send status:</label>
                <select onChange={(event) => { setSendStatus(event.target.value) }} value={sendStatus} name="sent" id="sent">
                    <option value="true">sent</option>
                    <option value="false">project</option>
                </select>
                <label htmlFor="rope">Type of climb:</label>
                <select onChange={(event) => { setRope(event.target.value) }} value={rope} name="rope" id="rope">
                    <option value="1">top rope</option>
                    <option value="2">lead</option>
                    <option value="3">autobelay</option>
                </select>
                <label htmlFor="wall">Wall angle:</label>
                <select onChange={(event) => { setWall(event.target.value) }} value={wall} name="wall" id="wall">
                    <option value="1">slab</option>
                    <option value="2">vertical</option>
                    <option value="3">overhang</option>
                </select>
                <label htmlFor="hold">Main hold type:</label>
                <select onChange={(event) => { setHold(event.target.value) }} value={hold} name="hold" id="hold">
                    <option value="1">crimps</option>
                    <option value="2">slopers</option>
                    <option value="3">jugs</option>
                    <option value="4">pinches</option>
                </select>
                <label htmlFor="flash">Flashed?</label>
                <select onChange={(event) => { setFlash(event.target.value) }} value={flash} name="flash" id="flash">
                    <option value="true">yes</option>
                    <option value="false">no</option>
                </select>
                <TextField onChange={(event) => { setNotes(event.target.value) }} value={notes} id="outlined-basic" label="notes" variant="outlined" />
                <TextField onChange={(event) => { setImage(event.target.value) }} value={image} id="outlined-basic" label="image url" variant="outlined" />
                <Button type="submit" variant="contained" color="primary">
                    Done
                </Button>

            </form>
            <Button onClick={handleCancel} variant="contained" color="secondary">Cancel</Button>
        </>
    )
}

export default AddRoute;