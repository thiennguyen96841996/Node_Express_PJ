var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');

/**
 * Create mysql connect
 */
const mysql = require('mysql');

const con = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'rootpw',
  database: 'express'
});

const urlencodedParser = bodyParser.urlencoded({ extended: false });

/* GET users listing. */
router.get('/', function(req, res, next) {
  const sql = "select * from users";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.render('users/index',{users : result, title: 'User'});
  });
});

router.post('/store',
    urlencodedParser,
    [
      check('name', 'This name must me 3+ characters long')
          .exists()
          .isLength({ min: 3 }),
      check('email', 'Email is not valid')
          .isEmail()
          .normalizeEmail()
    ],
    (req, res) => {
      const errors = validationResult(req);
      if(!errors.isEmpty()) {
        // return res.status(422).jsonp(errors.array())
        const alert = errors.array()
        res.render('users/create', {title: 'User create',
          alert
        });
      } else {
        const sql = "INSERT INTO users SET ?";
        con.query(sql,req.body,function(err, result, fields){
          if (err) throw err;
          console.log(result);
          res.redirect('/users');
        });
      }
});

/* delete users listing. */
router.get('/delete/:id',(req,res)=>{
  const sql = "DELETE FROM users WHERE id = ?";
  con.query(sql,[req.params.id],function(err,result,fields){
    if (err) throw err;
    console.log(result)
    res.redirect('/users');
  })
});

/* create users listing. */
router.get('/create', function(req, res, next) {
  res.render('users/create', {title: 'User create'});
});

/* edit users listing. */
router.get('/edit/:id',(req,res)=>{
  const sql = "SELECT * FROM users WHERE id = ?";
  con.query(sql,[req.params.id],function (err, result, fields) {
    if (err) throw err;
    res.render('users/edit',{user : result, title: 'User edit'});
  });
});

/* update users listing. */
router.post('/update/:id',
    urlencodedParser,
    [
      check('name', 'This name must me 3+ characters long')
          .exists()
          .isLength({ min: 3 }),
      check('email', 'Email is not valid')
          .isEmail()
          .normalizeEmail()
    ],
    (req,res)=>{
      const errors = validationResult(req);
      if(!errors.isEmpty()) {
        // return res.status(422).jsonp(errors.array())
        // const alert = errors.array()
        res.redirect('/users/edit/' + req.params.id);
      } else {
  const sql = "UPDATE users SET ? WHERE id = " + req.params.id;
  con.query(sql,req.body,function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.redirect('/users');
  });
      }
});

module.exports = router;
