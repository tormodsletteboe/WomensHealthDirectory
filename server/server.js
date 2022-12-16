const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const feedbackRouter = require('./routes/feedback.router');
const preventativecareRouter=require('./routes/preventativecare.router');

const ageRangeRouter = require('./routes/agerange.router');
const newsletterRouter = require('./routes/newsletter.router');
const specificResourcesRouter = require('./routes/specificresources.router');


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
app.use('/api/feedback', feedbackRouter);
app.use('/api/preventativecare', preventativecareRouter);
app.use('/api/agerange', ageRangeRouter);
app.use('/api/newsletter', newsletterRouter);
app.use('/api/newsletter', newsletterRouter);
app.use('/api/adminprevcare/specificresources', specificResourcesRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
