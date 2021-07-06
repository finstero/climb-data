import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

// material ui
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

function GradeScheme() {

    const history = useHistory();
    const dispatch = useDispatch();

    // local state for selected grade scheme
    const [gradeScheme, setGradeScheme] = useState('error');

    // sends selected grade scheme to saga/reducer
    const handleContinue = (event) => {
        event.preventDefault();
        // dispatch({
        //     type: 'FETCH_GRADE_SCHEME',
        //     payload: {
        //         gradeScheme: gradeScheme,
        //     }
        // })
        if (gradeScheme == 'error') {
            alert('please select a grade scheme!')
        }
        else {
            history.push(`/routes/add/${gradeScheme}`);
        }
        console.log('log gradescheme', gradeScheme);
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
    }));

    const classes = useStyles();
    const [chipData, setChipData] = useState([
        { key: 'ysd', label: 'Yosemite Decimal System' },
        { key: 'ysd_simple', label: 'Yosemite Decimal System - Simple' },
        { key: 'french', label: 'French' },
    ]);

    const handleClick = (chipToChoose) => () => {
        setChipData((chips) => chips.filter((chip) => chip.key == chipToChoose.key));
        console.log('log chipToChoose', chipToChoose.key);
        setGradeScheme(chipToChoose.key);
    }

    const handleCancel = () => {
        history.push('/routes/home');
    }

    return (
        <>
            {/* <form onSubmit={handleContinue}>
                <label htmlFor="grades-scheme">Grading scheme:</label>
                <select onChange={(event) => { setGradeScheme(event.target.value) }} value={gradeScheme} name="grades-scheme" id="grades-scheme">
                    <option value="ysd">yosemite decimal system</option>
                    <option value="ysd_simple">yosemite decimal system - simple</option>
                    <option value="french">french</option>
                </select>
                <Button type="submit">Continue</Button>
            </form> */}
            <Grid container justify="center">
                <Grid item>
                    <form onSubmit={handleContinue}>
                        {chipData.map((data) => {
                            return (
                                <div key={data.key}>
                                    <Chip
                                        label={data.label}
                                        onClick={handleClick(data)}
                                        className={classes.chip}
                                    />
                                </div>
                            );
                        })}
                        <Button onClick={handleCancel}>Cancel</Button>
                        <Button type="submit">Continue</Button>
                    </form>
                </Grid>
            </Grid>
        </>
    )
}

export default GradeScheme;