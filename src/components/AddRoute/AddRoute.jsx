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
    const [selectedDate, setSelectedDate] = useState(new Date('2021-06-18T21:11:54'));

    useEffect(() => {
        dispatch({
            type: 'FETCH_GRADES'
        })
    }, []);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const grades = useSelector(store => store.gradesReducer)

    return (
        <>
            <form>
                <label for="grades">Choose a grade:</label>
                <select name="grades" id="grades">
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
                <select name="sent" id="sent">

                </select>
                <label for="rope">Type of climb:</label>
                <select name="rope" id="rope">

                </select>
                <label for="wall">Wall angle:</label>
                <select name="wall" id="wall">

                </select>
                <label for="hold">Main hold type:</label>
                <select name="hold" id="hold">

                </select>
                <label for="flash">Flashed?</label>
                <select name="flash" id="flash">

                </select>
                <TextField id="outlined-basic" label="notes" variant="outlined" />
                <TextField id="outlined-basic" label="image url" variant="outlined" />
                <Button type="submit" variant="contained" color="primary">
                    Done
                </Button>

            </form>
            <Button variant="contained" color="secondary">Cancel</Button>
        </>
    )
}

export default AddRoute;