const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const bcrypt = require("bcrypt");

router.get('/', function (req, res, next) {
    const isAuth = req.isAuthenticated();
    res.render('signup', {
        title: 'Sign up',
        isAuth: isAuth,
    });
});

router.post('/', function (req, res, next) {
    const isAuth = req.isAuthenticated();
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const repassword = req.body.repassword;

    knex("users1")
    .where({name: username})
    .select("*")
    .then(async function (result) {
        if (result.length !== 0) {
            res.render("signup", {
                title: "Sign up",
                errorMessage: ["このユーザ名は既に使われています"],
            })
        } else if (password === repassword) {
            const hashedPassword = await bcrypt.hash(password, 10);
            knex("users1")
                .insert({name: username, password: hashedPassword, email: email})
                .then(function () {
                    res.redirect("/");
                })
                .catch(function (err) {
                    console.error(err);
                    res.render("signup", {
                        title: "Sign up",
                        errorMessage: [err.sqlMessage],
                        isAuth: isAuth,
                    });
                });
        } else {
            res.render("signup", {
                title: "Sign up",
                errorMessage: ["パスワードが一致しません"],
                isAuth: isAuth,
            });
        }
    })
    .catch(function (err) {
        console.error(err);
        res.render("signup", {
            title: "Sign up",
            errorMessage: [err.sqlMessage],
            isAuth: false,
        });
    });
});

module.exports = router;