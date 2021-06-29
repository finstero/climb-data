import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

// material ui
import Button from '@material-ui/core/Button';

function GradeScheme () {

    const history = useHistory();
    const dispatch = useDispatch();

    const [gradeScheme, setGradeScheme] = useState('ysd');

    const handleContinue = (event) => {
        event.preventDefault();
        dispatch({
            type: 'FETCH_GRADE_SCHEME',
            payload: {
                gradeScheme: gradeScheme,
            }
        })
        history.push('/routes/add');
    }

    return(
        <>
            <form onSubmit={handleContinue}>
                <label htmlFor="grades-scheme">Grading scheme:</label>
                <select onChange={(event) => { setGradeScheme(event.target.value) }} value={gradeScheme} name="grades-scheme" id="grades-scheme">
                    <option value="ysd">yosemite decimal system</option>
                    <option value="ysd_simple">yosemite decimal system - simple</option>
                    <option value="french">french</option>
                </select>
                <Button type="submit">Continue</Button>
            </form>
        </>
    )
}

export default GradeScheme;