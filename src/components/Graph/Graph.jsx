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

    const [sendStatusChip, setSendStatusChip] = useState([
        { key: true, label: 'sent', disabled: false },
        { key: false, label: 'project', disabled: false },
    ]);

    const handleChipClick = (chipToChoose) => () => {  
        setSendStatusChip((chips) => chips.filter((chip) => chip.label === chipToChoose.label));
        console.log('log sendStatusChip', sendStatusChip);
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
                <DialogTitle id="form-dialog-title">Filter</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Choose what type of routes to see.
                    </DialogContentText>
                    <div>
                        {sendStatusChip.map((data) => {
                            return (
                                <span key={data.key}>
                                    <Chip
                                        label={data.label}
                                        onClick={handleChipClick(data)}
                                        className={classes.chip}
                                        disabled={data.disabled}
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