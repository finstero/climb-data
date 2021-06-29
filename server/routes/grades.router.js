const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');


// /api/grades
router.get('/', rejectUnauthenticated, (req, res) => {

    console.log('grades router get query', req.query.gradeScheme);

    const query = `SELECT * FROM "grades"
                    WHERE "grades".type=$1;`;

    console.log('in get in grades router');

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