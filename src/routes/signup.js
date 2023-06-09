const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', function (req, res, next) {
    const userId = req.session.userid;
    const isAuth = Boolean(userId);
    res.render('signup', {
        title: 'Sign up',
        isAuth: isAuth,
    });
});

router.post('/', function (req, res, next) {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const repassword = req.body.repassword;

    knex("users1")
    .where({name: username})
    .select("*")
    .then(function (result) {
        if (result.length !== 0) {
            res.render("signup", {
                title: "Sign up",
                errorMessage: ["このユーザ名は既に使われています"],
            })
        } else if (password === repassword) {
            knex("users1")
                .insert({name: username, password: password, email: email})
                .then(function () {
                    res.redirect("/");
                })
                .catch(function (err) {
                    console.error(err);
                    res.render("signup", {
                        title: "Sign up",
                        errorMessage: [err.sqlMessage],
                    });
                });
        } else {
            res.render("signup", {
                title: "Sign up",
                errorMessage: ["パスワードが一致しません"],
            });
        }
    })
    .catch(function (err) {
        console.error(err);
        res.render("signup", {
            title: "Sign up",
            errorMessage: [err.sqlMessage],
        });
    });
});

module.exports = router;