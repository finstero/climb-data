const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// /api/grades
router.get('/', (req, res) => {
    const query = `SELECT * FROM "ysd"`

    pool.query(query)
    .then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('error in grades router get', error);
        res.sendStatus(500);
    })
});


router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;