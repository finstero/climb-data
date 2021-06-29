const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// /api/routes
// router.get('/', (req, res) => {
//     const query = `SELECT * FROM "ysd";`;

//     console.log('in get in grades router');
//     pool.query(query)
//     .then(result => {
//         console.log('result.rows in grades get router', result.rows);
//         res.send(result.rows);
//     })
//     .catch(error => {
//         console.log('error in grades router get', error);
//         res.sendStatus(500);
//     })
// });

// /api/routes
router.post('/', (req, res) => {
    console.log('req.body in routes post', req.body);
    const insertRouteQuery = 
        ` INSERT INTO "routes" ("notes", "image", "flash", "sent", "date", "user_id", "ysd_id", "rope_type_id")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING "id";`;

    pool.query(insertRouteQuery, [req.body.notes, req.body.image, req.body.flash, req.body.sent, req.body.date, req.user.id, req.body.ysd_id, req.body.rope_type_id])
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