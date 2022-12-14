import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import healthCategories from './healthCategories';
import ageRanges from './agerange.reducer';
import editMedicalLinks from './editmedicallinks.reducer';
import specificResources from './specificresources.reducer';
import resourceToEdit from './resourcetoedit.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  healthCategories,
  ageRanges, // age ranges from the DB table
  editMedicalLinks, //when user is editing a medial link, or adding a new medical link, ie typing in the textfields
  resourceToEdit, 
  specificResources // age ranges from the DB table
});

export default rootReducer;
