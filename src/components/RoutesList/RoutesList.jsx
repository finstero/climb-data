import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
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
                        <TableCell>{route.date.slice(0, 10)}</TableCell>
                        <TableCell>{route.rope_type}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        <Button onClick={handleAdd}>Add Route</Button>
        <Button onClick={handleViewGraph}>View Routes Graph</Button>
        <h2>Data Grid</h2>
        </>
    )
}

export default RoutesList;