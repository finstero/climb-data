const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {
    console.log('in graph router get');
    const query = 
        `SELECT "grades".grade, count("routes") FROM "grades"
        LEFT JOIN "routes" ON "grades".id = "routes".grades_id
        LEFT Join "user" ON "user".id = "routes".user_id
        WHERE "grades".type='ysd'
        GROUP BY "grades".id
        ORDER BY "grades"
        ;`

    pool.query(query)
    .then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('error in router get', error);
        res.sendStatus(500);
    });
});




module.exports = router;