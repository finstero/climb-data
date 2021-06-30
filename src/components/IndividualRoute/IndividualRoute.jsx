import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';


// material ui
import Button from '@material-ui/core/Button';

function IndividualRoute () {

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch({
            type: 'FETCH_ROUTE',
        })
    }, []);


    return(
        <>
            <h2>Last Route Added</h2>
            <Button>Delete</Button>
            <Button>Edit</Button>
            <Button>View Routes Graph</Button>
        </>
    )
}

export default IndividualRoute;