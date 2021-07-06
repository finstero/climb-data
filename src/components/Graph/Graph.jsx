import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import { Line } from 'react-chartjs-2';

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
    const allGraph = useSelector(store => store.graphs.allGraph);
    const [open, setOpen] = useState(false);
    const [sendStatus, setSendStatus] = useState('true');
    const [filterOptions, setFilterOptions] = useState('');


    const data = {
        // labels: ['1', '2', '3', '4', '5', '6'],
        datasets: [
            {
                label: '# of routes (project and sent)',
                data: allGraph,
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    };

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

    const handleBack = () => {
        history.push('/routes/list')
    }

    const handleFilter = () => {
        setOpen(true);
    }

    const handleFilterCancel = () => {
        setOpen(false);
    }

    const handleFilterChoices = () => {
        dispatch({
            type: 'FETCH_FILTERED_GRAPH',
            payload: {
                sent: sendStatus,
            }
        })
        setOpen(false);
        setFilterChip([
            { key: 'true', label: 'sent' },
            { key: 'false', label: 'project' },
        ])
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
        // formControl: {
        //     margin: theme.spacing(1),
        //     minWidth: 120,
        // },
        // selectEmpty: {
        //     marginTop: theme.spacing(2),
        // },
    }));

    const classes = useStyles();

    const [filterChip, setFilterChip] = useState([
        { key: 'true', label: 'sent' },
        { key: 'false', label: 'project' },
        // { key: 'sendStatus', label: 'send status' },
        // { key: 'rope', label: 'rope type' },
        // { key: 'wall', label: 'wall angle' },
        // { key: 'hold', label: 'main hold type' },
        // { key: 'flash', label: 'if flashed' },
        // { key: 'date', label: 'date' },
    ]);

    // const handleChipClick = (filter) => () => {
    //     console.log('clicked chip');
    //     setFilterOptions(filter.key);
    //     // console.log('log chipToChoose', filter);
    // }

    const handleChipClick = (chipToChoose) => () => {
        setFilterChip((chips) => chips.filter((chip) => chip.label === chipToChoose.label));
        // console.log('log sendStatusChip', sendStatus);
        setSendStatus(chipToChoose.key);
        console.log('log chipToChoose', chipToChoose);
    }

    return (
        <>
            <h2>All Routes</h2>
            <Line data={data} options={options} />
            <Button onClick={handleBack}>Back</Button>
            <Button onClick={handleFilter}>Filter Routes</Button>
            <Dialog open={open} onClose={handleFilterCancel} aria-labelledby="form-dialog-title">
                <DialogContent>
                    <DialogContentText>
                        Choose what type of routes to see.
                    </DialogContentText>
                    <div>
                        {filterChip.map((data) => {
                            return (
                                <span key={data.key}>
                                    <Chip
                                        label={data.label}
                                        onClick={handleChipClick(data)}
                                        className={classes.chip}
                                    />
                                </span>
                            );
                        })}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleFilterCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleFilterChoices} color="primary">
                        Filter
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Graph;