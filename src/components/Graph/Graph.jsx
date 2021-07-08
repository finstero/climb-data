import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

// components
import GraphForm from '../GraphForm/GraphForm';
import GraphOverlay from '../GraphOverlay/GraphOverlay';

// material ui
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';

function Graph() {

    const history = useHistory();
    const dispatch = useDispatch();
    const { grading } = useParams();

    // reducers
    const allGraph = useSelector(store => store.graphs.allGraph);
    const ropes = useSelector(store => store.formOptions.ropeReducer)
    const walls = useSelector(store => store.formOptions.wallReducer)
    const holds = useSelector(store => store.formOptions.holdReducer)


    // local state
    const [open, setOpen] = useState(false);
    const [sendStatus, setSendStatus] = useState('error');
    const [rope, setRope] = useState('');
    const [wall, setWall] = useState('');
    const [hold, setHold] = useState('');
    const [flash, setFlash] = useState('');

    // grabs all routes on page load
    useEffect(() => {
        dispatch({
            type: 'FETCH_GRAPH_DATA',
            payload: {
                gradeScheme: grading,
            },
        })
            // {
            //     type: 'FETCH_FORM_OPTIONS'
            // })
    }, []);

    // data for line graph. grabbed from reducer
    const data = {
        // labels: ['1', '2', '3', '4', '5', '6'],
        datasets: [
            {
                label: '# of routes',
                data: allGraph,
                fill: false,
                backgroundColor: '#0C163D',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    };

    // options for line graph
    const options = {
        parsing: {
            xAxisKey: 'grade',
            yAxisKey: 'count'
        },
        scales: {
            yAxis: {
                min: 0,
                ticks: {
                    beginAtZero: true,
                    stepSize: 1,
                },
            },
        },
    };

    // moves user back to routes list. Clears reducer holding graph info.
    const handleBack = () => {
        dispatch({
            type: 'CLEAR_ALL_GRAPH',
        })
        history.push('/routes/list')
    }

    // // opens dialog form for sent/project selection
    // const handleFilter = () => {
    //     setOpen(true);
    // }

    // // close dialog form without action
    // const handleFilterCancel = () => {
    //     setOpen(false);
    // }

    // // on click of Filter button inside of form dialog, send info to server/db to grab selected routes
    // const handleFilterChoices = () => {
    //     if (sendStatus == 'error') {
    //         alert('Please choose what type of routes to see!');
    //     } else {
    //         dispatch({
    //             type: 'FETCH_FILTERED_GRAPH',
    //             payload: {
    //                 gradeScheme: grading,
    //                 sent: sendStatus,
    //                 rope_type_id: 1,
    //                 wall_id: 2,
    //                 holds_id: 3,
    //                 flash: true,
    //             }
    //         })
    //         setOpen(false);
    //         setFilterChip([
    //             { key: 'true', label: 'sent' },
    //             { key: 'false', label: 'project' },
    //         ])
    //     }
    // }

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
            minWidth: 130,
        },
    }));

    const classes = useStyles();

    // const [filterChip, setFilterChip] = useState([
    //     { key: 'true', label: 'sent' },
    //     { key: 'false', label: 'project' },
    // ]);

    // const handleChipClick = (chipToChoose) => () => {
    //     setFilterChip((chips) => chips.filter((chip) => chip.label === chipToChoose.label));
    //     // console.log('log sendStatusChip', sendStatus);
    //     setSendStatus(chipToChoose.key);
    //     console.log('log chipToChoose', chipToChoose);
    // }

    // const handleFilter = () => {
    //     setOpen(true);
    // }
    // const handleFilterCancel = () => {
    //     setOpen(false);
    // }



    return (
        <>
            <h2>All Routes</h2>
            <Line data={data} options={options} />
            <Button onClick={handleBack}>Back</Button>
            <GraphOverlay classes={classes} />
            <GraphForm classes={classes} />
        </>
    )
}

export default Graph;