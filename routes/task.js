const express = require('express');
const router = express.Router();
const {
  getTaskById,
  getUserById
} = require('./database');
const {
  categorizeTask
} = require('../routes/apiroutes');

module.exports = (db) => {
  // load tasks page
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM to_do_lists;`)
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

  router.post('/', async (req, res) => {
    const input = {
      task: req.body.item,
      user_id: req.session.user_id
    }
    // categorize new task
    const newTask = await categorizeTask(input);
    res.json(newTask);

  })

  // get tasks from database in json format
  router.get('/api', async (req, res) => {
    const tasks = await getTaskById(req.session.user_id);
    res.json(tasks);
  })

  return router;
}
