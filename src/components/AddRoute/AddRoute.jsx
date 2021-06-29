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
    const [grade, setGrade] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date('2021-06-18T21:11:54'));
    const [sendStatus, setSendStatus] = useState('');
    const [rope, setRope] = useState('');
    const [wall, setWall] = useState('');
    const [hold, setHold] = useState('');
    const [flashed, setFlashed] = useState('');
    const [notes, setNotes] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        dispatch({
            type: 'FETCH_GRADES'
        },
            {
                type: 'FETCH_WALL_TYPES'
            })
    }, []);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleCancel = () => {
        history.push('/routes/home')
    }

    const grades = useSelector(store => store.gradesReducer)

    return (
        <>
            <form>
                <label for="grades">Choose a grade:</label>
                <select onChange={(event) => {setGrade(event.target.value)}} name="grades" id="grades">
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
                <label for="sent">Send status:</label>
                <select onChange={(event) => {setSendStatus(event.target.value)}} name="sent" id="sent">
                    <option value="sent">sent</option>
                    <option value="project">project</option>
                </select>
                <label for="rope">Type of climb:</label>
                <select onChange={(event) => {setRope(event.target.value)}} name="rope" id="rope">
                    <option value="top rope">top rope</option>
                    <option value="lead">lead</option>
                    <option value="autobelay">autobelay</option>
                </select>
                <label for="wall">Wall angle:</label>
                <select onChange={(event) => {setWall(event.target.value)}} name="wall" id="wall">
                    <option value="slab">slab</option>
                    <option value="vertical">vertical</option>
                    <option value="overhang">overhang</option>
                </select>
                <label for="hold">Main hold type:</label>
                <select onChange={(event) => {setHold(event.target.value)}} name="hold" id="hold">
                    <option value="crimps">crimps</option>
                    <option value="slopers">slopers</option>
                    <option value="pinches">pinches</option>
                    <option value="jugs">jugs</option>
                </select>
                <label for="flash">Flashed?</label>
                <select onChange={(event) => {setFlashed(event.target.value)}} name="flash" id="flash">
                    <option value="true">yes</option>
                    <option value="false">no</option>
                </select>
                <TextField onChange={(event) => {setNotes(event.target.value)}} id="outlined-basic" label="notes" variant="outlined" />
                <TextField onChange={(event) => {setImage(event.target.value)}} id="outlined-basic" label="image url" variant="outlined" />
                <Button type="submit" variant="contained" color="primary">
                    Done
                </Button>

            </form>
            <Button onClick={handleCancel} variant="contained" color="secondary">Cancel</Button>
        </>
    )
}

export default AddRoute;