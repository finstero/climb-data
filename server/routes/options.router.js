const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// api/routes/options/rope
router.get('/rope', rejectUnauthenticated, (req, res) => {

    const query = `SELECT * FROM "rope";`;

    pool.query(query)
    .then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('error in options router rope get', error);
    })
});

router.get('/wall', rejectUnauthenticated, (req, res) => {

    const query = `SELECT * FROM "wall";`;

    pool.query(query)
    .then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('error in options router wall get', error);
    })
});

router.get('/holds', rejectUnauthenticated, (req, res) => {

    const query = `SELECT * FROM "holds";`;

    pool.query(query)
    .then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('error in options router holds get', error);
    })
});

router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;