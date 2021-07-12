import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

import GraphForm from '../GraphForm/GraphForm';

// material ui
import { DataGrid } from '@material-ui/data-grid';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Chip from '@material-ui/core/Chip';

function RoutesList() {

    const dispatch = useDispatch();
    const history = useHistory();

    const allRoutes = useSelector(store => store.routes.allRoutes);

    const [open, setOpen] = useState(false);
    const [gradeScheme, setGradeScheme] = useState('error');

    // moves user to details page for route on click
    const handleRouteClick = (route) => {
        // console.log('clicked');
        // dispatch({
        //     type: 'FETCH_ONE_ROUTE',
        //     payload: {id: route.id}
        // })
        // console.log('date format attempt', format(new Date(2017, 0, 6), 'dd MMMM yyyy'));
        history.push(`/routes/details/${route.id}`)
    }

    // grabs all routes on page load
    useEffect(() => {
        dispatch({
            type: 'FETCH_ALL_ROUTES'
        })
    }, []);

    // moves user to add route
    const handleAdd = () => {
        history.push('/routes/grades');
    }

    // moves user to graph. dispatch to grab data for graph
    const goViewGraph = () => {
        if (gradeScheme == 'error') {
            alert('please select a grade scheme!')

        } else {
            history.push(`/routes/graph/${gradeScheme}`);
        }
    }

    // for data grid
    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'grade', headerName: 'Grade', width: 120, sortable: false },
        { field: 'date', headerName: 'Date', width: 110 },
        { field: 'rope_type', headerName: 'Type', width: 110 }
    ]

    // route.date.slice(0, 10)

    // opens form dialog for selecting grade scheme to view
    const handleViewGraph = () => {
        setOpen(true);
    }

    // moves user out of form dialog and resets chips
    const handleCancel = () => {
        setOpen(false);
        setChipData([
            { key: 'ysd', label: 'Yosemite Decimal System' },
            { key: 'ysd_simple', label: 'Yosemite Decimal System - Simple' },
            { key: 'french', label: 'French' },
        ]);
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
        formControl: {
            margin: theme.spacing(1),
            minWidth: 130,
        },
    }));

    const classes = useStyles();

    // array of grade scheme objects for chips
    const [chipData, setChipData] = useState([
        { key: 'ysd', label: 'Yosemite Decimal System' },
        { key: 'ysd_simple', label: 'Yosemite Decimal System - Simple' },
        { key: 'french', label: 'French' },
    ]);

    // on click of grade scheme chip, disappears un selected chips and sets grade scheme to chosen grade scheme for dispatch
    const handleChipClick = (chipToChoose) => () => {
        setChipData((chips) => chips.filter((chip) => chip.key == chipToChoose.key));
        // console.log('log chipToChoose', chipToChoose.key);
        setGradeScheme(chipToChoose.key);
    }

    const handleReset = () => {
        console.log('clicked reset');
        dispatch({
            type: 'FETCH_ALL_ROUTES'
        })
    }

    const dispatchType = { type: `FETCH_FILTERED_ROUTES` };

    return (
        <>
            <Grid container>
                <Grid item xs={12} className={classes.root}>
                    <h1>All Routes</h1>
                </Grid>

                {/* FILTER ROUTES button */}
                <Grid item xs={12} className={classes.root}>
                    <GraphForm classes={classes} dispatchType={dispatchType} />
                    <Button onClick={handleReset} variant="contained" color="secondary">Reset</Button>
                </Grid>
            </Grid>
            <TableContainer component={Paper}>
                <Table aria-label="routes table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Grade</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Type</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allRoutes.map(route => (
                            <TableRow key={route.id} onClick={() => handleRouteClick(route)}>
                                <TableCell component="th" scope="row">{route.grade}</TableCell>
                                <TableCell>{format(new Date(route.date), 'dd MMMM yyyy')}</TableCell>
                                <TableCell>{route.rope_type}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* <Button onClick={handleAdd} variant="contained" color="primary">Add Route</Button> */}
            {/* <Button onClick={handleViewGraph} variant="contained" color="primary">View Routes Graph</Button> */}
            {/* <h2>Data Grid</h2>
            <div style={{ width: '100%' }}>
                <DataGrid rows={allRoutes} columns={columns} autoHeight='true' hideFooterPagination='true' />
            </div> */}
        </>
    )
}

export default RoutesList;