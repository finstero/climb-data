import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";


// material ui
import Chip from "@material-ui/core/Chip";

function RopeChip({ rope, classes }) {

    const dispatch = useDispatch();

    const selectedChip = useSelector(store => store.chips)

    const handleChipClick = (rope) => {
        console.log('rope.id', rope.id);
        console.log('selectedChip', selectedChip)
        // dispatch({ type: 'ADD_ROPE', payload: selectedChip.filter(chip => chip === !rope.id) })
        

        if (selectedChip.includes(rope.id)) {
            dispatch({ type: 'DELETE_ROPE' })
        } else {
            dispatch({ type: 'DELETE_ROPE' })
            dispatch({ type: 'ADD_ROPE', payload: rope.id })
        }
    }

    return (
        <>
            <li
                key={rope.id}
                // onClick={handleChipClick}
            >
                <Chip
                    color={selectedChip.includes(rope.id) ? 'primary' : 'default'}
                    value={rope.id}
                    label={rope.type}
                    clickable={true}
                    className={classes.chip}
                    onClick={() => handleChipClick(rope)}
                ></Chip>
            </li>

        </>
    )
}

export default RopeChip;