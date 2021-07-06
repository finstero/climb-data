const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('in graph router get', req.query.grade);
    const query =
        `SELECT "grades".grade, count("routes") FROM "grades"
        LEFT JOIN "routes" ON "grades".id = "routes".grades_id AND "routes".user_id = $1
        LEFT JOIN "rope" ON "rope".id = "routes".rope_type_id
        LEFT JOIN "routes_holds" ON "routes_holds".routes_id = "routes".id
        LEFT JOIN "holds" ON "routes_holds".holds_id = "holds".id
        LEFT JOIN "routes_wall" ON "routes_wall".routes_id = "routes".id
        LEFT JOIN "wall" ON "routes_wall".wall_id = "wall".id
        WHERE "grades".type = $2
        GROUP BY "grades".id
        ORDER BY "grades"
        ;`

    pool.query(query, [req.user.id, req.query.grade])
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log('error in router get', error);
            res.sendStatus(500);
        });
});

router.put('/filtered', rejectUnauthenticated, (req, res) => {
    console.log('in filtered graph router get req.query', req.body);

    const query = 
        `SELECT "grades".grade, count("routes") FROM "grades"
        LEFT JOIN "routes" ON "grades".id = "routes".grades_id AND "routes".user_id = $1 AND "routes".sent = $2
        LEFT JOIN "rope" ON "rope".id = "routes".rope_type_id 
        LEFT JOIN "routes_holds" ON "routes_holds".routes_id = "routes".id 
        LEFT JOIN "holds" ON "routes_holds".holds_id = "holds".id
        LEFT JOIN "routes_wall" ON "routes_wall".routes_id = "routes".id
        LEFT JOIN "wall" ON "routes_wall".wall_id = "wall".id
        WHERE "grades".type = 'ysd'
        GROUP BY "grades".id
        ORDER BY "grades"
        ;`

    // const queryA =
    //     `SELECT "grades".grade, count("routes") FROM "grades"
    //     LEFT JOIN "routes" ON "grades".id = "routes".grades_id AND "routes".user_id = $1`;

    // let queryB = '';
    // let queryC = '';
    // if (req.body.sent) {
    //     queryB = `AND "routes".sent = $2
    //     LEFT JOIN "rope" ON "rope".id = "routes".rope_type_id`;
    //     } else {
    //         queryB = `LEFT JOIN "rope" ON "rope".id = "routes".rope_type_id`;
    //     }
    // if (req.body.rope) {
    //     queryC = `AND "rope".id = $3
    //     LEFT JOIN "routes_holds" ON "routes_holds".routes_id = "routes".id
    //     LEFT JOIN "holds" ON "routes_holds".holds_id = "holds".id
    //     LEFT JOIN "routes_wall" ON "routes_wall".routes_id = "routes".id
    //     LEFT JOIN "wall" ON "routes_wall".wall_id = "wall".id
    //     WHERE "grades".type = 'ysd'
    //     GROUP BY "grades".id
    //     ORDER BY "grades"
    //     ;`;
    // } else {
    //     queryC = 
    //     `LEFT JOIN "routes_holds" ON "routes_holds".routes_id = "routes".id
    //     LEFT JOIN "holds" ON "routes_holds".holds_id = "holds".id
    //     LEFT JOIN "routes_wall" ON "routes_wall".routes_id = "routes".id
    //     LEFT JOIN "wall" ON "routes_wall".wall_id = "wall".id
    //     WHERE "grades".type = 'ysd'
    //     GROUP BY "grades".id
    //     ORDER BY "grades"
    //     ;`;
    // }

    // let queryAll = queryA + ' ' + queryB + ' ' + queryC

    pool.query(query, [req.user.id, req.body.sent])
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log('error in router get', error);
            res.sendStatus(500);
        });
});




module.exports = router;