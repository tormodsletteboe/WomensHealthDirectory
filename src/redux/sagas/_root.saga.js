import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
<<<<<<< HEAD
import healthCategoriesSaga from './healthCategoriesSaga';
import ageRangeSaga from './agerange.saga';
import specificResourcesSaga from './specificResourcesSaga';
<<<<<<< HEAD
=======
import ageRangeSaga from './ageRange.saga';
import newsletterSaga from './newsletter.saga';
>>>>>>> 5cf8d62 (complete newsletter subscription)
=======

>>>>>>> 92fc521 (resolve merge conflicts)

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    healthCategoriesSaga(),
    ageRangeSaga(), // fetches age ranges
<<<<<<< HEAD
    specificResourcesSaga(),
=======
    newsletterSaga(), // add submitted emails to newsletter table
<<<<<<< HEAD
>>>>>>> 5cf8d62 (complete newsletter subscription)
=======
    specificResourcesSaga(),
>>>>>>> 92fc521 (resolve merge conflicts)
  ]);
}
