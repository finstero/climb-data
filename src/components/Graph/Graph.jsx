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

function Graph() {

    const history = useHistory();
    const allGraph = useSelector(store => store.graphs.allGraph);
    const [open, setOpen] = useState(false);

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
        
        setOpen(false);
    }

    return (
        <>
            <h2>All Routes</h2>
            <Line data={data} options={options} />
            <Button onClick={handleBack}>Back</Button>
            <Button onClick={handleFilter}>Filter Routes</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Filter</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Choose what type of routes to see.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleFilterCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleFilterChoices} color="primary">
                        Subscribe
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Graph;