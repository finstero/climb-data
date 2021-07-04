import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {format} from 'date-fns';
// import RouteListItem from '../RouteListItem/RouteListItem';

// material ui
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function RoutesList() {

    const dispatch = useDispatch();
    const history = useHistory();

    const allRoutes = useSelector(store => store.routes.allRoutes);

    // moves user to details page for route on click
    const handleRouteClick = (route) => {
        console.log('clicked');
        // dispatch({
        //     type: 'FETCH_ONE_ROUTE',
        //     payload: {id: route.id}
        // })
        console.log('date format attempt', format(new Date(2017, 0, 6), 'dd MMMM yyyy'));
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

    // moves user to graph 
    const handleViewGraph = () => {
        dispatch({
            type: 'FETCH_GRAPH_DATA'
        })
        history.push('/routes/graph');
    }

// for data grid

const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'grade', headerName: 'Grade', width: 120, sortable: false },
    { field: 'date', headerName: 'Date', width: 110 },
    { field: 'rope_type', headerName: 'Type', width: 110 }
]

// const rows = [
//     {id: 1, grade: '5.10a', date: '2021-06-30', rope_type: 'lead'},
//     {id: 2, grade: '5.11b', date: '2021-06-13', rope_type: 'top rope'},
//     {id: 3, grade: '5.11c', date: '2020-05-30', rope_type: 'top rope'},
//     {id: 4, grade: '5.10b', date: '2021-05-30', rope_type: 'lead'}
// ]

    // const rows = route;

    // route.date.slice(0, 10)

    return (
        <>
        <h2>All Routes</h2>
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
        <Button onClick={handleAdd}>Add Route</Button>
        <Button onClick={handleViewGraph}>View Routes Graph</Button>
        <h2>Data Grid</h2>
        <div style={{width: '100%'}}>
            <DataGrid rows={allRoutes} columns={columns} autoHeight='true' hideFooterPagination='true' />
        </div>
        </>
    )
}

export default RoutesList;