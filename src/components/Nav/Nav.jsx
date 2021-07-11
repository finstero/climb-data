import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useDispatch, useSelector } from 'react-redux';

// material ui
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ListIcon from '@material-ui/icons/List';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddBoxIcon from '@material-ui/icons/AddBox';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Chip from '@material-ui/core/Chip';

function Nav() {

  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((store) => store.user);

  const [open, setOpen] = useState(false);
  const [gradeScheme, setGradeScheme] = useState('error');
  const [graph, setGraph] = useState(false);

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null) {
    loginLinkData.path = '/routes/home';
    loginLinkData.text = 'Home';
  }

  // array of grade scheme objects for chips
  const gradeSchemeChips = [
    { key: 'ysd', label: 'Yosemite Decimal System' },
    { key: 'ysd_simple', label: 'Yosemite Decimal System - Simple' },
    { key: 'french', label: 'French' },
  ];

  // opens form dialog for selecting grade scheme to view
  const handleShowGraph = (event) => {
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

  const goViewGraph = () => {
    if (gradeScheme == 'error') {
      alert('please select a grade scheme!')
    } else {
      history.push(`/routes/graph/${gradeScheme}`);
      setOpen(false)
      setChipData(gradeSchemeChips);
    }
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    chartButton: {
      marginRight: theme.spacing(0),
    },
    logoutButton: {
      marginRight: theme.spacing(0),
    },
    title: {
      flexGrow: 1,
    },
    toolbar: {
      minHeight: 70,
    },
    chip: {
      margin: theme.spacing(0.5),
    },
    dialog: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      listStyle: 'none',
      padding: theme.spacing(0.5),
      margin: 0,
    },
  }));

  const classes = useStyles();

  return (
    <>
      {/* <Menu
        id="nav-menu"
        anchorEl={menu}
        keepMounted
        open={Boolean(menu)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Add Route</MenuItem>
        <MenuItem onClick={handleClose}>View All Routes</MenuItem>
        <MenuItem onClick={handleClose}>View Routes Graph</MenuItem>
      </Menu> */}
      <div className={classes.root}>
        <AppBar position="static" className={classes.toolbar}>
          <Toolbar className={classes.title}>
            <Link className="navLink" to='/routes/home'>
              <Typography variant="h6">
                Climb Data
              </Typography>
            </Link>
            {/* <Button
              color="inherit"
              className={classes.title}>Climb Data</Button> */}
            {!user.id &&
              <Link className="navLink" to={loginLinkData.path}>
                {loginLinkData.text}
              </Link>
            }
            {user.id &&
              <>
              <Link className="navLink" to='/routes/'>
                  <IconButton
                    edge="start"
                    className={classes.chartButton}
                    color="inherit"
                    aria-label="menu"
                    onClick={handleShowGraph}
                  >
                    <AddIcon fontSize="large" />
                  </IconButton>
                </Link>
                <Link className="navLink" to='/routes/list'>
                  <IconButton
                    edge="start"
                    className={classes.chartButton}
                    color="inherit"
                    aria-label="menu"
                    onClick={handleShowGraph}
                  >
                    <ShowChartIcon fontSize="large" />
                  </IconButton>
                </Link>
                <Link className="navLink" to='/routes/list'>
                  <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="menu"
                  // onClick={handleShowRouteList}
                  >
                    <ListIcon fontSize="large" />
                  </IconButton>
                </Link>
                <div className="navLink">
                  <IconButton
                    edge="start"
                    className={classes.logoutButton}
                    color="inherit"
                    aria-label="menu"
                    onClick={() => dispatch({ type: 'LOGOUT' })}
                  >
                    <ExitToAppIcon />
                  </IconButton>
                </div>
              </>
            }
          </Toolbar>
        </AppBar>
      </div>

      {/* For grade scheme selection before seeing graphs. */}
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
          <Button onClick={goViewGraph} variant="contained" color="primary">
            View Graph
          </Button>
        </DialogActions>
      </Dialog>
    </>
    // <div className="nav">
    //   <Link to="/routes/home">
    //     <h2 className="nav-title">Climb Data</h2>
    //   </Link>
    //   <div>
    //     <Link className="navLink" to={loginLinkData.path}>
    //       {loginLinkData.text}
    //     </Link>

    //     {user.id && (
    //       <>
    //         <Link className="navLink" to="/info">
    //           Info Page
    //         </Link>
    //         <LogOutButton className="navLink" />
    //       </>
    //     )}

    //     {/* <Link className="navLink" to="/about">
    //       About
    //     </Link> */}
    //   </div>
    // </div>
  );
}

export default Nav;
