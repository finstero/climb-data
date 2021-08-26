const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/:gradeScheme', rejectUnauthenticated, (req, res) => {
    console.log('in graph router get', req.params);
    const query =
        `SELECT "grades".grade, "grades".id AS "label", count("routes") FROM "grades"
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

// route for filtering main graph
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('in filtered graph', req.query);

    let queryA =
        `SELECT "grades".grade, count("routes") FROM "grades"
        LEFT JOIN "routes" ON "grades".id = "routes".grades_id AND "routes".user_id = $1 `;

    let count = 3;

    let values = [req.user.id, req.query.gradeScheme]

    if (req.query.flash !== '') {
        // console.log('flash is here');
        queryA += `AND "routes".flash = $${count} `;
        count += 1;
        values.push(req.query.flash);
    }
    if (req.query.rope_type_id !== '') {
        queryA += `AND "routes".rope_type_id = $${count} `
        count += 1;
        values.push(req.query.rope_type_id);
    }
    if (req.query.sent !== '') {
        console.log('req.query.sent', req.query.sent);
        queryA += `AND "routes".sent = $${count} `
        count += 1;
        values.push(req.query.sent);
    }
    if (req.query.wall_id) {
        queryA += `AND "routes".wall_id = $${count} `
        count += 1;
        values.push(req.query.wall_id);
    }
    if (req.query.holds_id) {
        queryA += `AND "routes".holds_id = $${count} `
        count += 1;
        values.push(req.query.holds_id);
    }

    queryA += 
        `WHERE "grades".type = $2
        GROUP BY "grades".id
        ORDER BY "grades"
        ;`;
    
    // console.log('queryA', queryA);
    // console.log('values', values);
    pool.query(queryA, values)
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log('error in router get', error);
            res.sendStatus(500);
        });
});



module.exports = router;