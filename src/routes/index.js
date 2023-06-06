var express = require('express');
var router = express.Router();

const knex = require('../db/knex');

/* GET home page. */
router.get('/', function(req, res, next) {
    const userId = req.session.userid;
    const isAuth = Boolean(userId);

    knex("tasks")
    .select("*")
    .then(function (results) {
        console.log(results);
        res.render('index', {
            title: 'ToDo App',
            todos: results,
            isAuth: isAuth,
        });
    })
    .catch(function (err) {
        console.error(err);
        res.render('index', {
            title: 'ToDo App',
            isAuth: isAuth,
        });
    });
});

router.post('/', function(req, res, next) {
    const userId = req.session.userid;
    const isAuth = Boolean(userId);
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
            isAuth: isAuth,
        });
    });
});

module.exports = router;
