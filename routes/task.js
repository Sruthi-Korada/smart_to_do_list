const express = require('express');
const router = express.Router();
const {
  getTaskById,
  getUserById,
  addTask
} = require('./database');
// const {
//   categorizeTask
// } = require('../routes/apiroutes');

module.exports = (db) => {
  // load tasks page
  router.get("/", (req, res) => {

    db.query(`SELECT * FROM to_do_lists WHERE user_id = ${req.session.user_id};`)
      .then(data => {
        const tasks = data.rows;
        res.json({
          tasks
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

  router.get('/add', async (req, res) => {
    const input = {
      input: req.query.item_input,
      user_id: req.session.user_id,
      category_id: req.query.category_id,
    };
    const newTask = await addTask(input);
    res.json(newTask);
  })

  // get tasks from database in json format
  // router.get('/api', async (req, res) => {
  //   const tasks = await getTaskById(req.session.user_id);
  //   res.json(tasks);
  // })

  return router;
}
