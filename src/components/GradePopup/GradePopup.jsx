import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


// material ui
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Chip from '@material-ui/core/Chip';



function GradePopup({classes}) {
    
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const [gradeScheme, setGradeScheme] = useState('error');
    const [graph, setGraph] = useState(false);

    // array of grade scheme objects for chips
  const gradeSchemeChips = [
    { key: 'ysd', label: 'Yosemite Decimal System' },
    { key: 'ysd_simple', label: 'Yosemite Decimal System - Simple' },
    { key: 'french', label: 'French' },
  ];

  // opens form dialog for selecting grade scheme to view
  const handleGradeSchemeSelection = (event) => {
    event.preventDefault();
    setOpen(true);
  }

  // moves user out of form dialog and resets chips
  const handleCancel = () => {
    setOpen(false);
    setChipData(gradeSchemeChips);
  }

  const [chipData, setChipData] = useState(gradeSchemeChips);

  // on click of grade scheme chip, disappears un selected chips and sets grade scheme to chosen grade scheme for dispatch
  const handleChipClick = (chipToChoose) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key == chipToChoose.key));
    setGradeScheme(chipToChoose.key);
  }

  const handleContinue = () => {
    if (gradeScheme == 'error') {
      alert('please select a grade scheme!')
    } else {
      setOpen(false)
      history.push(`/routes/add/${gradeScheme}`)
      setChipData(gradeSchemeChips);
    }
  }

    return (
        <>
            <IconButton
                edge="start"
                className={classes.chartButton}
                color="inherit"
                aria-label="menu"
                onClick={handleGradeSchemeSelection}
            >
                <AddIcon fontSize="large" />
            </IconButton>


            <Dialog open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
                <DialogContent>
                    <DialogContentText>
                        Choose which grade scheme to view.
                    </DialogContentText>
                    <div className={classes.dialog}>
                        {chipData.map((data) => {
                            return (
                                <span key={data.key}>
                                    <Chip
                                        label={data.label}
                                        onClick={handleChipClick(data)}
                                        className={classes.chip}
                                    />
                                </span>
                            );
                        })}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} variant="contained" color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleContinue} variant="contained" color="primary">
                        Continue
                    </Button>
                </DialogActions>
            </Dialog>
        </>

    )
}

export default GradePopup;