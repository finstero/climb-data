const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// CURRENTLY NOT USED
router.get('/', (req, res) => {
  console.log('filter router', req.query);
  let query =
  `SELECT "routes".id, "grades".grade, "routes".date, "rope".type AS "rope_type" FROM "routes"
  JOIN "grades" ON "grades".id = "routes".grades_id
  JOIN "rope" ON "rope".id = "routes".rope_type_id
  JOIN "holds" ON "routes".holds_id = "holds".id
  JOIN "wall" ON "routes".wall_id = "wall".id 
  WHERE "routes".user_id = $1 `;

let count = 2;

let values = [req.user.id]

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

});


module.exports = router;