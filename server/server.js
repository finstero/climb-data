const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const gradesRouter = require('./routes/grades.router'); 
const routesRouter = require('./routes/routes.router'); // CLIMBING routes
const graphsRouter = require('./routes/graphs.router'); // all related to graph display
const optionsRouter = require('./routes/options.router'); // all related to input options
const filterRouter = require('./routes/filter.router'); // info for displaying selected filters for graph or list
// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/grades', gradesRouter)
app.use('/api/routes', routesRouter); // CLIMBING routes
app.use('/api/routes/graph', graphsRouter);
app.use('/api/routes/options', optionsRouter);
app.use('/api/routes/filterdisplay', filterRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
