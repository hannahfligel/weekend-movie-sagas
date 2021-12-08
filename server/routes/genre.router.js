const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

// router.get('/', (req, res) => {
//   // Add query to get all genres
//   res.sendStatus(500)
// });


router.get('/', (req, res) => {

  const query = `SELECT * FROM genres ORDER BY "name" ASC`;
  pool.query(query)
    .then( result => {
      console.log("GENRE RESULTS:", result.rows);
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })

});


module.exports = router;