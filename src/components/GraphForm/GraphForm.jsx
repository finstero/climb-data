import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function GraphForm() {

    const store = useSelector((store) => store);
    const ropes = useSelector(store => store.formOptions.ropeReducer)
	const walls = useSelector(store => store.formOptions.wallReducer)
	const holds = useSelector(store => store.formOptions.holdReducer)

    const [sendStatus, setSendStatus] = useState('');
	const [rope, setRope] = useState('');
	const [wall, setWall] = useState('');
	const [hold, setHold] = useState('');
	const [flash, setFlash] = useState('');

    const [heading, setHeading] = useState('Functional Component');



    return (
        <div>
            <h2>{heading}</h2>

        </div>
    );
}

export default GraphForm;