import React, { useState } from "react";
import { useDispatch } from "react-redux";


// material ui
import Chip from "@material-ui/core/Chip";

function RopeChip({ rope, classes }) {

    const dispatch = useDispatch();

    // selected and deselected chip color
    const [chipColor, setChipColor] = useState('default');

    const handleChipClick = () => {
        console.log('rope.id', rope.id);
        // if clicking on an unselected chip (grey color), sets color to primary
        // and dispatches that single tag id to reducer
        if (chipColor == 'default') {
            setChipColor('primary');
            dispatch({
                type: 'ADD_TAG',
                payload: {tag_id: rope.id}
            })
            // if clicking on selected chip (primary color), sets color to default
            // and deletes that single tag id from reducer
        } else if (chipColor == 'primary') {
            setChipColor('default');
            dispatch({
                type: 'DELETE_TAG',
                payload: {delete_id: rope.id}
            })
        }
    }

    return (
        <>
            <li
                key={rope.id}
                onClick={handleChipClick}
            >
                <Chip
                    color={chipColor}
                    value={rope.id}
                    label={rope.name}
                    className={classes.chip}
                ></Chip>
            </li>

        </>
    )
}

export default RopeChip;