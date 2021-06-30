import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function RouteDetails () {

    const {id} = useParams();

    useEffect(() => {
        dispatch({
            type: ''
        })
    }, []);

    return(
        <>
        </>
    )
}

export default RoutDetails;