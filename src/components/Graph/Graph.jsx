import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

// components
import GraphForm from '../GraphForm/GraphForm';
import GraphOverlay from '../GraphOverlay/GraphOverlay';

// material ui
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
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
    const overlay = useSelector(store => store.graphs.overlay);
    const overlayExists = useSelector(store => store.graphs.overlayExists);
    const filter = useSelector(store => store.filter);
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
        },
        )
    }, []);

    // data for line graph. grabbed from reducer
    const data = {
        // labels: ['1', '2', '3', '4', '5', '6'],
        datasets: [
            {
                label: 'Main',
                data: allGraph,
                fill: false,
                backgroundColor: '#263A43',
                borderColor: '#263A43',
            },
        ],
    };

    // user views this line graph data if overlay exists
    const overlayData = {
        // labels: ['1', '2', '3', '4', '5', '6'],
        datasets: [
            {
                label: 'Main',
                data: allGraph,
                fill: false,
                backgroundColor: '#263A43',
                borderColor: '#263A43',
            },
            {
                label: 'Overlay',
                data: overlay,
                fill: false,
                backgroundColor: '#799AA3',
                borderColor: '#799AA3',
            },
        ],
    };

    // options for line graph
    const options = {
        parsing: {
            xAxisKey: 'grade',
            yAxisKey: 'count'
        },
        elements: {
            point: {
                radius: 0
            },
        },
        scales: {
            yAxis: {
                title: {
                    display: true,
                    text: '# Routes'
                },
                min: 0,
                ticks: {
                    beginAtZero: true,
                    stepSize: 1,
                },
            },
            xAxis: {
                title: {
                    display: true,
                    text: 'Grade'
                },
            },
        }
    };

    // moves user back to routes list. Clears reducer holding graph info.
    const handleBack = () => {
        dispatch({
            type: 'CLEAR_ALL_GRAPH',
        })
        dispatch({
            type: 'CLEAR_OVERLAY_GRAPH',
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
        btn: {
            color: 'white',
            backgroundColor: '#799AA3'
        }
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

    const dispatchType = {
        type: 'FETCH_FILTERED_GRAPH',
        filter: 'SET_GRAPH_FILTER_DISPLAY'
    };

    return (
        <>
            <Grid item xs={12} className={classes.root}>
                <h1>Routes Graph</h1>
                {/* <ul>{allGraph.map(item => (
                    <li>{item.grade}</li>
                ))
                
                }</ul> */}
            </Grid>
            {/* {filter.status &&
                <h3>Main filtered by: 
                    {filter.sendStatus ?  
                    <span>Sent</span>
                :
                <span>Project</span>
                }

                </h3>
            } */}
            {overlayExists.status ?
                <div>
                    {/* <h3>Overlay showing: </h3> */}
                    <Line data={overlayData} options={options} height={250} />
                </div>
                :
                <Line data={data} options={options} height={250} />
            }
            <Grid item xs={12} className={classes.root}>
                <Button onClick={handleBack} variant="contained" color="secondary">Back</Button>
                <GraphOverlay classes={classes} />
                <GraphForm classes={classes} dispatchType={dispatchType} />
            </Grid>
        </>
    )
}

export default Graph;