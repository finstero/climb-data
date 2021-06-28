import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

// material ui
import Button from '@material-ui/core/Button';

function AddRoute() {

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: 'FETCH_GRADES'
        })
    }, []);

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
                <Button type="submit" variant="contained" color="primary">
                    Done
                </Button>
            </form>
            <Button variant="contained" color="secondary">Cancel</Button>
        </>
    )
}

export default AddRoute;