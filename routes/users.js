/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */


const express = require('express');
const bcrypt = require('bcrypt');

const {
  getUserWithEmail,
  addUser
} = require('./database.js');

const router = express.Router();


const cookieSession = require("cookie-session");

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT id, email FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({
          users
        });
      })
      .catch(err => {
        res
          .status(500)
          .json({
            error: err.message
          });

      });

  });
  router.get("/user", (req, res) => {
    res.render("user")
  });

  router.get("/register", (req, res) => {
    res.render("../views/register")
  });

  router.post("/register", async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    //Check for empty string
    if (email === "" || password === "") {
      res.status(400).send("Please supply email and password");
      return;
    }

    let existingUser = await getUserWithEmail(email);
    console.log("Existing user" + existingUser);
    if (existingUser != undefined) {
      res.status(400).send("Existing user email, please register"); //if email already in use
      return;
    }
    // Add new user
    let newUser = addUser(email, bcrypt.hashSync(password, 10))

    console.log(newUser);
    req.session.user_id = newUser.id;

    res.redirect('/dashboard');
  });

  router.get("/login", (req, res) => {
    //clear session variables
    res.render("../views/index");
  });

  // logging in
  router.post('/login', async (req, res) => {
    // query the database for the email input by user
    getUserWithEmail(req.body.email)
      .then(user => {
        if (!user) {
          res.json({
            error: 'User does not exist'
          });

        } else {
          // check password
          if (!bcrypt.compareSync(req.body.password, user.password)) {
            res.json({
              error: 'Password does not match'
            });

          } else {
            req.session = {
              user_id: user.id
            };
            res.redirect("/dashboard")

          }
        }
      })
      .catch(err => {
        console.error('login error', err);

      });

  });

  // LOGOUT//
  router.get('/logout', (req, res) => {
    console.log("logging out");
    // clear session cookie
    req.session = null;
    // redirect to homepage/login
    res.redirect('/');

  });

  return router;
};
