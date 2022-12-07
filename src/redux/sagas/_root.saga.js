import { all } from 'redux-saga/effects';
import documentSaga from './document.saga';
import feedbackSaga from './feedback.saga';
import guidelineSaga from './guideline.saga';
import loginSaga from './login.saga';
import physicianSaga from './physician.saga';
import playbookSaga from './playbook.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';

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
    playbookSaga(),
    documentSaga(),
    feedbackSaga(),
    guidelineSaga(),
    physicianSaga()
  ]);
}
