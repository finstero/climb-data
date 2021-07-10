import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { useDispatch } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import RoutesHome from '../RoutesHome/RoutesHome';
import AddRoute from '../AddRoute/AddRoute';
import LatestRoute from '../LatestRoute/LatestRoute';
import RoutesList from '../RoutesList/RoutesList';
import RouteDetails from '../RouteDetails/RouteDetails';
import Graph from '../Graph/Graph';

import './App.css';

// material ui
import '@fontsource/roboto';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);



  // dark blue color #0C163D, secondary for blue: #E26B00
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#263A43'
      },
      secondary: {
        main: '#C93F2B'
      }
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/routes/home" />

            {/* Visiting localhost:3000/about will show the about page. */}
            {/* <Route
              // shows AboutPage at all times (logged in or not)
              exact
              path="/about"
            >
              <AboutPage />
            </Route> */}

            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            {/* <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <ClimbHome />
          </ProtectedRoute> */}

            {/* <ProtectedRoute
              exact
              path="/climbhome">
              <ClimbHome />
            </ProtectedRoute> */}

            <ProtectedRoute
              exact
              path="/routes/home"
            >
              <RoutesHome />
            </ProtectedRoute>

            {/* <ProtectedRoute
              exact
              path="/routes/grades"
            >
              <GradeScheme />
            </ProtectedRoute> */}

            <ProtectedRoute
              exact
              path="/routes/add/:grading"
              children={<AddRoute />}
            >
              <AddRoute />
            </ProtectedRoute>

            <ProtectedRoute
              exact
              path="/routes/latest"
            >
              <LatestRoute />
            </ProtectedRoute>

            <ProtectedRoute
              exact
              path="/routes/list"
            >
              <RoutesList />
            </ProtectedRoute>

            <ProtectedRoute
              exact
              path="/routes/details/:id"
              children={<RouteDetails />}
            >
              <RouteDetails />
            </ProtectedRoute>

            <ProtectedRoute
              exact
              path="/routes/graph/:grading"
              children={<Graph />}
            >
              <Graph />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shows InfoPage else shows LoginPage
              exact
              path="/info"
            >
              <InfoPage />
            </ProtectedRoute>

            {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows LoginPage at /login
              exact
              path="/login"
              authRedirect="/routes/home"
            >
              <LoginPage />
            </ProtectedRoute>

            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows RegisterPage at "/registration"
              exact
              path="/registration"
              authRedirect="/user"
            >
              <RegisterPage />
            </ProtectedRoute>

            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows LandingPage at "/home"
              exact
              path="/home"
              authRedirect="/user"
            >
              <LandingPage />
            </ProtectedRoute>

            {/* If none of the other routes matched, we will show a 404. */}
            <Route>
              <h1>404</h1>
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
