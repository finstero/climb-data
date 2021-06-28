import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

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
            <label for="grades">Choose a grade:</label>

            <select name="grades" id="grades">
                {grades.map(grade => (
                    <option key={grade.id} value={grade.id}>{grade.grade}</option>
                ))}
                {/* <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option> */}
            </select>
        </>
    )
}

export default AddRoute;