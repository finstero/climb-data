import React, { useState } from 'react';
import { useSelector } from 'react-redux';

// material ui
import Button from '@material-ui/core/Button';

function GraphOverlay() {

    const addOverlay = () => {
        
    }

	return (
		<div>
			<Button onClick={addOverlay}>Add Overlay</Button>
		</div>
	);
}

export default GraphOverlay;