const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => { // GET ALL FEEDBACK: RATINGS + COMMENTS
  // SELECT * FROM "feedback" ORDER BY "id" ASC;
  pool.query(`
     
  `)
    .then(dbRes => {
      res.send(dbRes.rows);
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    })
});


router.get('/avg', (req, res) => { // GET AVERAGE OF ALL RATINGS
  pool.query(`
    SELECT AVG("rating") as average_rating FROM "feedback";
  `)
    .then(dbRes => {
      res.send(dbRes.rows);
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    })
})

router.post('/', async (req, res) => {
  // console.log('INSIDE FEEDBACK ROUTER POST :: ', req.body);

  const client = await pool.connect();
  const questions = req.body.questions;
  const answers = req.body.answers;

  try {
    await client.query('BEGIN'); // start database stream

    const newFeedbackID = await client.query(`
      INSERT INTO "feedback" ("comment", "rating")
      VALUES ($1, $2) RETURNING "id";
    `, [req.body.comment, req.body.rating]);

    await Promise.all(questions.map(async (question, i) => {
      // console.log('IN QUESTIONS.MAP :: QUESTION, INDEX', question, i);
      await client.query(`
        INSERT INTO "feedback_q" ("question", "answer", "feedback_id")
        VALUES ($1, $2, $3);
      `, [question, answers[i+1], newFeedbackID.rows[0].id]);
    }));

    await client.query('COMMIT'); // if everything is as required
    res.sendStatus(201);

  } catch (err) {

    await client.query('ROLLBACK'); // if something is missing
    console.log('Unable to complete survey entry :: ', err);
    res.sendStatus(500);

  } finally {
    client.release(); // stop the database stream
  }
});

router.delete('/', (req, res) => { // DELETE FEEDBACK
  pool.query(`
    DELETE FROM "feedback" WHERE "id" = $1;
  `, [req.body.id])
    .then(dbRes => {
      console.log('---- Deleted feedback row : ', req.body.id);
      res.sendStatus(200);
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    })
})

module.exports = router;
