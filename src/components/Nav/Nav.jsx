import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

// material ui
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListIcon from '@material-ui/icons/List';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function Nav() {

  const user = useSelector((store) => store.user);

  const [menu, setMenu] = useState(null);

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null) {
    loginLinkData.path = '/routes/home';
    loginLinkData.text = 'Home';
  }


  const handleShowGraph = () => {

  }

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    logoutButton: {
      marginRight: theme.spacing(0),
    },
    title: {
      flexGrow: 1,
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
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Climb Data
            </Typography>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={handleShowGraph}
            >
              <ShowChartIcon fontSize="large" />
            </IconButton>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={handleShowGraph}
            >
              <ListIcon fontSize="large" />
            </IconButton>
            <IconButton
              edge="start"
              className={classes.logoutButton}
              color="inherit"
              aria-label="menu"
              onClick={handleShowGraph}
            >
              <ExitToAppIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
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
