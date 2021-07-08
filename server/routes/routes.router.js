const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');


// api/routes/latest
// gets most recent route posted by user
router.get('/latest', rejectUnauthenticated, (req, res) => {
    const query = 
        `SELECT "routes".id, "routes".notes, "routes".image, "routes".flash, "routes".sent, 
        "routes".date, "grades".grade, "grades".type, "rope".type AS "rope_type", "wall".angle, 
        "holds".type FROM "routes"
        JOIN "grades" ON "grades".id = "routes".grades_id
        JOIN "rope" ON "rope".id = "routes".rope_type_id
        JOIN "holds" ON "routes".holds_id = "holds".id
        JOIN "wall" ON "routes".wall_id = "wall".id
        WHERE "routes".user_id = $1
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

// gets route details for ONE route clicked on by user
router.get('/details/:id', rejectUnauthenticated, (req, res) => {
    // console.log('hopefully id', req.params);

    const query =
        `SELECT "routes".id, "routes".notes, "routes".image, "routes".flash, "routes".sent, 
        "routes".date, "routes".rope_type_id, "routes".grades_id, "grades".grade, "grades".type AS "grades_type", "rope".type AS "rope_type", "wall".angle, 
        "holds".type, "routes".wall_id, "routes".holds_id FROM "routes"
        JOIN "grades" ON "grades".id = "routes".grades_id
        JOIN "rope" ON "rope".id = "routes".rope_type_id
        JOIN "holds" ON "routes".holds_id = "holds".id
        JOIN "wall" ON "routes".wall_id = "wall".id
        WHERE "routes".user_id = $1 AND "routes".id = $2
        ;`
    console.log('logging req.params.id', req.params.id);
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

// gets ALL routes for user
router.get('/', rejectUnauthenticated, (req, res) => {

    // new for data grid
    const getAllRoutesQuery = 
        `SELECT "routes".id, "grades".grade, "routes".date, "rope".type AS "rope_type" FROM "routes"
        JOIN "grades" ON "grades".id = "routes".grades_id
        JOIN "rope" ON "rope".id = "routes".rope_type_id
        JOIN "holds" ON "routes".holds_id = "holds".id
        JOIN "wall" ON "routes".wall_id = "wall".id
        WHERE "routes".user_id = $1
        ORDER BY "grades".id ASC
        ;`;

    pool.query(getAllRoutesQuery, [req.user.id])
        .then(result => {
            // console.log('all routes', result.rows);
            res.send(result.rows);
        })
        .catch(error => {
            console.log('error in get all routes', error);
            res.sendStatus(500);
        })
})

// posts one route 
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('req.body in routes post', req.body);
    const insertRouteQuery =
        ` INSERT INTO "routes" ("notes", "image", "flash", "sent", "date", "user_id", "grades_id", "rope_type_id", "holds_id", "wall_id")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING "id";`;

    pool.query(insertRouteQuery, [req.body.notes, req.body.image, req.body.flash, req.body.sent, req.body.date, req.user.id, req.body.grades_id, req.body.rope_type_id, req.body.holds_id, req.body.wall_id])
        .then(result => {
            console.log('result in climbingRoutes post', result);
            console.log('created route id', result.rows[0].id);
            const createdRouteId = result.rows[0].id;
            res.sendStatus(201);
        })
        .catch(error => {
            console.log('error in climbingRoutes post', error);
            res.sendStatus(500);
        });
});

// deletes one route
router.delete(`/details/:id`, rejectUnauthenticated, (req, res) => {
    console.log('in delete route router');

    const query =
        `DELETE FROM "routes"
    WHERE "routes".id = $1 AND "user_id" = $2
    ;`
    pool.query(query, [req.params.id, req.user.id])
        .then(result => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.log('error in details router delete');
            res.sendStatus(500);
        })
})

// edits one route
router.put(`/edit/:id`, rejectUnauthenticated, (req, res) => {
    console.log('in router put for routes', req.body);

    const query =
        `UPDATE "routes"
    SET "notes" = $1, "image" = $2, "flash" = $3, "sent" = $4, "date" = $5, "grades_id" = $6, "rope_type_id" = $7, "holds_id" = $8, "wall_id" = $9
    WHERE "id" = $10 AND "user_id" = $11
    ;`
    pool.query(query,
        [req.body.notes, req.body.image, req.body.flash, req.body.sent, req.body.date, req.body.grades_id, req.body.rope_type_id, req.body.holds_id, req.body.wall_id, req.params.id, req.user.id])
        .then(result => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log('error in router.put for routes', error);
            res.sendStatus(500);
        })
})

// grabs list of filtered routes
router.get('/filter', rejectUnauthenticated, (req, res) => {

    let query =
        `SELECT "routes".id, "grades".grade, "routes".date, "rope".type AS "rope_type" FROM "routes"
        JOIN "grades" ON "grades".id = "routes".grades_id
        JOIN "rope" ON "rope".id = "routes".rope_type_id
        JOIN "holds" ON "routes".holds_id = "holds".id
        JOIN "wall" ON "routes".wall_id = "wall".id 
        WHERE "routes".user_id = $1 `;

    let count = 2;

    let values = [req.user.id]

    if (req.query.gradeScheme !== '') {
        query += `AND "grades".type = $${count} `
        count += 1;
        values.push(req.query.gradeScheme);
    }
    if (req.query.flash !== '') {
        console.log('flash is here');
        query += `AND "routes".flash = $${count} `;
        count += 1;
        values.push(req.query.flash);
    }
    if (req.query.rope_type_id !== '') {
        query += `AND "routes".rope_type_id = $${count} `
        count += 1;
        values.push(req.query.rope_type_id);
    }
    if (req.query.sent !== '') {
        console.log('req.query.sent', req.query.sent);
        query += `AND "routes".sent = $${count} `
        count += 1;
        values.push(req.query.sent);
    }
    if (req.query.wall_id) {
        query += `AND "routes".wall_id = $${count} `
        count += 1;
        values.push(req.query.wall_id);
    }
    if (req.query.holds_id) {
        query += `AND "routes".holds_id = $${count} `
        count += 1;
        values.push(req.query.holds_id);
    }

    query += `ORDER BY "grades".id ASC;`;
    
    console.log('query', query);
    console.log('values', values);


    pool.query(query, values)
        .then(result => {
            // console.log('all routes', result.rows);
            res.send(result.rows);
        })
        .catch(error => {
            console.log('error in get all routes', error);
            res.sendStatus(500);
        })
})

module.exports = router;