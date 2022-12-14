import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import newsletterSaga from './newsletter.saga';
import healthCategoriesSaga from './healthCategoriesSaga';
import specificResourcesSaga from './specificResourcesSaga';
import medicalLinksSaga from './medicalLinks.saga';
import ageRangeSaga from './agerange.saga';
import categoryDetailSaga from './categoryDetail.saga';
import virtualHealthLinksSaga from './virtualHealthLinks.saga';
import feedbackSaga from './feedback.saga';

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
    newsletterSaga(), // add submitted emails to newsletter table
    specificResourcesSaga(),
    medicalLinksSaga(),
    categoryDetailSaga(), //fetch category details
    virtualHealthLinksSaga(),
    feedbackSaga(),
  ]);
}
