const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const playbookRouter = require('./routes/playbook.router');
const physicianRouter = require('./routes/physician.router');
const guidelineRouter = require('./routes/guideline.router');
const feedbackRouter = require('./routes/feedback.router');
const documentRouter = require('./routes/document.router');
const preventativecareRouter=require('./routes/preventativecare.router');
const ageRangeRouter = require('./routes/agerange.router');

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
app.use('/api/playbook', playbookRouter);
app.use('/api/physician', physicianRouter);
app.use('/api/guideline', guidelineRouter);
app.use('/api/feedback', feedbackRouter);
app.use('/api/document', documentRouter);
app.use('/api/preventativecare', preventativecareRouter);
app.use('/api/agerange', ageRangeRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
