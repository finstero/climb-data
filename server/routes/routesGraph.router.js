const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/:gradeScheme', rejectUnauthenticated, (req, res) => {
    console.log('in graph router get', req.params);
    const query =
        `SELECT "grades".grade, count("routes") FROM "grades"
        LEFT JOIN "routes" ON "grades".id = "routes".grades_id AND "routes".user_id = $1
        WHERE "grades".type = $2
        GROUP BY "grades".id
        ORDER BY "grades"
        ;`

    pool.query(query, [req.user.id, req.params.gradeScheme])
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log('error in router get', error);
            res.sendStatus(500);
        });
});

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('in filtered graph router get req.query', req.query);

    const query =
        `SELECT "grades".grade, count("routes") FROM "grades"
        LEFT JOIN "routes" ON "grades".id = "routes".grades_id AND "routes".user_id = $1
        WHERE "grades".type = 'ysd'
        GROUP BY "grades".id,
        ORDER BY "grades"
        ;`

    // const queryA =
    //     `SELECT "grades".grade, count("routes") FROM "grades"
    //     LEFT JOIN "routes" ON "grades".id = "routes".grades_id AND "routes".user_id = $1`;

    // if (req.query.flash !== undefined) {
    //     queryA += `AND "routes".flash = $2`;
    // }

    // if (req.query.rope) {
    //     queryA += `AND "routes".rope_type_id = $3`
    // }
    // if (req.query.sent !== undefined) {
    //     queryA += `AND "routes".sent = $4`
    // }

    // queryA += `LEFT JOIN "rope" ON "rope".id = "routes".rope_type_id`;
    // queryA += `LEFT JOIN "routes_holds" ON "routes_holds".routes_id = "routes".id`;

    //     `WHERE "grades".type = 'ysd'
    //     GROUP BY "grades".id
    //     ORDER BY "grades"
    //     ;`;
    


    pool.query(query, [req.user.id])
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log('error in router get', error);
            res.sendStatus(500);
        });
});




module.exports = router;