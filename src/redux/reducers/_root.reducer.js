import { combineReducers } from 'redux';
import chips from './chips.reducer';
import errors from './errors.reducer';
import user from './user.reducer';
import formOptions from './formOptions.reducer';
import routes from './routes.reducer';
import graphs from './graphs.reducer';
import status from './status.reducer';
import filter from './filter.reducer';
// import id from './id.reducer';


// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  chips,
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  formOptions,
  routes,
  graphs,
  status,
  filter,
  // id,
});

export default rootReducer;
