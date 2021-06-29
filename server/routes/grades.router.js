const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// /api/grades
router.get('/', (req, res) => {

    const query = `SELECT * FROM $1;`;

    console.log('in get in grades router, query', req.query.gradeScheme);

    pool.query(query, [req.query.gradeScheme])
    .then(result => {
        console.log('result.rows in grades get router', result.rows);
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