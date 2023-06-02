var express = require('express');
var router = express.Router();

/**
 * Create mysql connect
 */
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'rootpw',
  database: 'express'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  connection.query(
      `select * from tasks;`,
      (error, results) => {
        console.log(error);
        console.log(results);
        res.render('index', {
          title: 'ToDo App',
          todos: results,
        });
      }
  );
});

router.post('/', function(req, res, next) {
  connection.connect((err) => {
    if (err) {
      console.log('error connecting: ' + err.stack);
      return
    }
    console.log('success');
  });
  const todo = req.body.add;
  connection.query(
      `insert into tasks (content) values ('${todo}');`,
      (error, results) => {
        console.log(error);
        res.redirect('/');
      }
  );
});

module.exports = router;
