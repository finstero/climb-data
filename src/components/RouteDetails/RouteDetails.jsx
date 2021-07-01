import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

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

function RouteDetails() {

    const dispatch = useDispatch();
    const history = useHistory();
    const route = useSelector(store => store.routes.oneRoute);

    // in edit mode only
    const grades = useSelector(store => store.addRouteOptions.gradesReducer)

    // state for edit mode
    const [editMode, setEditMode] = useState(false);

    // in edit mode only
    const [grade, setGrade] = useState('1');
    const [selectedDate, setSelectedDate] = useState(new Date('2021-06-18T11:11:54'));
    const [sendStatus, setSendStatus] = useState('');
    const [rope, setRope] = useState('1');
    const [wall, setWall] = useState('2');
    const [hold, setHold] = useState('1');
    const [flash, setFlash] = useState('true');
    const [notes, setNotes] = useState('');
    const [image, setImage] = useState('');

    const { id } = useParams();

    // loads selected route on page refresh
    useEffect(() => {
        dispatch({
            type: 'FETCH_ONE_ROUTE',
            payload: { id: id }
        })
    }, []);

    // deletes single route
    const handleDelete = () => {
        dispatch({
            type: 'DELETE_ROUTE',
            payload: { id: id }
        })
    }

    // moves user into edit mode via conditional render
    // sets local state of all inputs to same as route about to edit
    const handleEdit = () => {
        setEditMode(true);
        setGrade(route.grade);
        setSelectedDate(route.date);
        setSendStatus(route.sent);
        setRope(route.rope_type_id);
        setWall(route.wall_id);
        setHold(route.holds_id);
        setFlash(route.flash);
        setNotes(route.notes);
    }

    // moves user back to list view
    const handleBack = () => {
        history.push('/routes/list');
    }

    // moves user out of edit mode without saving changes
    const handleCancel = () => {
        setEditMode(false);
    }

    // for edit mode
    const handleDateChange = (date) => {

        setSelectedDate(date);
    };

    // put request to update route with changes
    const handleSave = (event) => {
        event.preventDefault();
        dispatch({
            type: 'EDIT_ROUTE',
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
        history.goBack();
    }

    return (
        <> {editMode ? <div><h2>EDIT MODE</h2>
            <form onSubmit={handleSave}>
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
                    <option value={true}>sent</option>
                    <option value={false}>project</option>
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
                <Button type="submit">Save</Button>
                </form>
                <Button onClick={handleCancel}>Cancel</Button>
        </div>
            : <div>
                <h1>{route?.date?.slice(0, 10)}</h1>
                <p>Grade: {route.grade}</p>
                <p>Climb type: {route.rope_type}</p>
                <p>Wall angle: {route.angle}</p>
                <p>Flash:
                    {route.flash ? ' yes' : ' no'}
                </p>
                <p>Sent: {route.sent ? ' sent' : ' project'}</p>
                <p>Main hold type: {route.type}</p>
                <p>Notes: {route.notes}</p>
                <p>Image: {route.image}</p>
                <Button onClick={handleDelete}>Delete</Button>
                <Button onClick={handleEdit}>Edit</Button>
                <Button onClick={handleBack}>Back</Button>
            </div>
        }
        </>
    )
}

            export default RouteDetails;