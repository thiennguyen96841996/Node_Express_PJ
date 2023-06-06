var express = require('express');
var router = express.Router();

const knex = require('../db/knex');

/* GET home page. */
router.get('/', function(req, res, next) {
    knex("tasks")
    .select("*")
    .then(function (results) {
        console.log(results);
        res.render('index', {
            title: 'ToDo App',
            todos: results,
        });
    })
    .catch(function (err) {
        console.error(err);
        res.render('index', {
            title: 'ToDo App',
        });
    });
});

router.post('/', function(req, res, next) {
  const todo = req.body.add;
    knex("tasks")
    .insert({content: todo})
    .then(function () {
        res.redirect('/')
    })
    .catch(function (err) {
        console.error(err);
        res.render('index', {
            title: 'ToDo App',
        });
    });
});

module.exports = router;
