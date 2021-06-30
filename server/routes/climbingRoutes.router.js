const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');


// api/routes/latest
// gets latest route posted by user
router.get('/latest', rejectUnauthenticated, (req, res) => {
    const query = `SELECT "routes".id, "routes".notes, "routes".image, "routes".flash, "routes".sent, 
                    "routes".date, "grades".grade, "grades".type, "rope".type AS "rope_type", "wall".angle, 
                    "holds".type FROM "routes"
                    JOIN "user" ON "user".id = "routes".user_id
                    JOIN "grades" ON "grades".id = "routes".grades_id
                    JOIN "rope" ON "rope".id = "routes".rope_type_id
                    JOIN "routes_holds" ON "routes_holds".routes_id = "routes".id
                    JOIN "holds" ON "routes_holds".holds_id = "holds".id
                    JOIN "routes_wall" ON "routes_wall".routes_id = "routes".id
                    JOIN "wall" ON "routes_wall".wall_id = "wall".id
                    WHERE "user".id = $1
                    ORDER BY "routes".id DESC
                    LIMIT 1
                    ;`;

    console.log('in get in grades latest router');
    pool.query(query, [req.user.id])
    .then(result => {
        console.log('result.rows in grades get router', result.rows);
        res.send(result.rows);
    })
    .catch(error => {
        console.log('error in grades router get', error);
        res.sendStatus(500);
    })
});

// gets route details for route clicked on by user
router.get('/details/:id', rejectUnauthenticated, (req, res) => {
    console.log('hopefully id', req.params);

    const query = 
                `SELECT "routes".id, "routes".notes, "routes".image, "routes".flash, "routes".sent, 
                "routes".date, "grades".grade, "grades".type, "rope".type AS "rope_type", "wall".angle, 
                "holds".type FROM "routes"
                JOIN "user" ON "user".id = "routes".user_id
                JOIN "grades" ON "grades".id = "routes".grades_id
                JOIN "rope" ON "rope".id = "routes".rope_type_id
                JOIN "routes_holds" ON "routes_holds".routes_id = "routes".id
                JOIN "holds" ON "routes_holds".holds_id = "holds".id
                JOIN "routes_wall" ON "routes_wall".routes_id = "routes".id
                JOIN "wall" ON "routes_wall".wall_id = "wall".id
                WHERE "user".id = $1 AND "routes".id = $2
                ;`
        pool.query(query, [req.user.id, req.params.id])
        .then(result => {
            console.log('one route', result.rows);
            res.send(result.rows);
        })
        .catch(error => {
            console.log('error in get oneRoute', error);
            res.sendStatus(500);
        })
})

// gets all routes for user
router.get('/', rejectUnauthenticated, (req, res) => {

    const getAllRoutesQuery = 
                `SELECT "routes".id, "routes".notes, "routes".image, "routes".flash, "routes".sent, 
                "routes".date, "grades".grade, "grades".type, "grades".id AS "grades_id", "rope".type AS "rope_type", "wall".angle, 
                "holds".type FROM "routes"
                JOIN "user" ON "user".id = "routes".user_id
                JOIN "grades" ON "grades".id = "routes".grades_id
                JOIN "rope" ON "rope".id = "routes".rope_type_id
                JOIN "routes_holds" ON "routes_holds".routes_id = "routes".id
                JOIN "holds" ON "routes_holds".holds_id = "holds".id
                JOIN "routes_wall" ON "routes_wall".routes_id = "routes".id
                JOIN "wall" ON "routes_wall".wall_id = "wall".id
                WHERE "user".id = $1
                ORDER BY "grades".id ASC
                ;`;

    pool.query(getAllRoutesQuery, [req.user.id])
    .then(result => {
        console.log('all routes', result.rows);
        res.send(result.rows);
    })
    .catch(error => {
        console.log('error in get all routes', error);
        res.sendStatus(500);
    })

})

// /api/routes
// posts one route 
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('req.body in routes post', req.body);
    const insertRouteQuery = 
        ` INSERT INTO "routes" ("notes", "image", "flash", "sent", "date", "user_id", "grades_id", "rope_type_id")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING "id";`;

    pool.query(insertRouteQuery, [req.body.notes, req.body.image, req.body.flash, req.body.sent, req.body.date, req.user.id, req.body.grades_id, req.body.rope_type_id])
    .then(result => {
        console.log('result in climbingRoutes post', result);
        console.log('created route id', result.rows[0].id);
        const createdRouteId = result.rows[0].id;

        const insertWallQuery = 
        `INSERT INTO "routes_wall" ("routes_id", "wall_id")
        VALUES ($1, $2);`

        pool.query(insertWallQuery, [createdRouteId, req.body.wall_id])
        .then(result => {
            const insertHoldsQuery = 
            `INSERT INTO "routes_holds" ("routes_id", "holds_id")
            VALUES ($1, $2);`
    
            pool.query(insertHoldsQuery, [createdRouteId, req.body.holds_id])
            .then(result => {
                console.log('all add route queries worked!');
                res.sendStatus(201)
            })
            .catch(error => {
                console.log('error in insertHoldsQuery', error);
                res.sendStatus(500);
            })
        })
        .catch(error => {
            console.log('error in insertWall query', error);
            res.sendStatus(500);
        })
    })
    .catch(error => {
        console.log('error in climbingRoutes post', error);
        res.sendStatus(500);
    });
});

module.exports = router;