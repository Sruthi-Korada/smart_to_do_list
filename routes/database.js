const {
  Pool
} = require('pg');
//const categories = require('./json/categories.json');
//const users = require('./json/users.json');
const pool = new Pool({
  users: 'labber',
  password: '123',
  host: 'localhost',
  database: 'midterm'
});
pool.connect();
const getUserWithEmail = async function (email) {
  const queryString = `
    SELECT * FROM users
    WHERE email = $1;
    `;
  const queryParams = [email];
  try {
    const res = await pool.query(queryString, queryParams);
    return res.rows[0] || null;
  } catch (err) {
    console.error('query error', err.stack);
  }
}
module.exports.getUserWithEmail = getUserWithEmail;
const addTask = async function (obj) {
  const {
    task,
    user_id,
    category_id
  } = obj;
  const queryString = `
     INSERT INTO to_do_lists (input, user_id,category_id)
     VALUES ($1, $2, $3)
     RETURNING *;
   `;
  const values = [task, user_id, category_id];
  try {
    const res = await db.query(queryString, values);
    return res.rows[0];
  } catch (err) {
    console.error('query error', err.stack);
  }
}
exports.addTask = addTask;
const addUser = async function (email, password) {
  const queryString = `
     INSERT INTO users (email, password)
     VALUES ($1, $2)
     RETURNING *;
   `;
  const values = [email, password];
  try {
    const res = await pool.query(queryString, values);
    return res.rows[0];
  } catch (err) {
    console.error('query error', err.stack);
  }
}
module.exports.addUser = addUser;
const checkAllEmails = async function (user_id) {
  const queryString = `
    SELECT email
    FROM users
    WHERE id != ${user_id};
    `;
  try {
    const res = await db.query(queryString);
    const emails = []
    for (let each of res.rows) {
      emails.push(each.email)
    }
    return emails;
  } catch (err) {
    console.error('query error', err.stack);
  }
}
exports.checkAllEmails = checkAllEmails;
const getUserById = async (id) => {
  const queryString = `
      SELECT *
      FROM users
      WHERE id = $1
    `;
  const queryParams = [id];
  try {
    const res = await db.query(queryString, queryParams);
    return res.rows[0];
  } catch (err) {
    console.error('query error', err.stack);
  }
}
exports.getUserById = getUserById;
const getTaskById = async (id) => {
  const queryString = `
      SELECT user_id, input, category_id
      FROM to_do_lists
      WHERE user_id = $1
    `;
  const queryParams = [id];
  try {
    const res = await db.query(queryString, queryParams);
    return res.rows;
  } catch (err) {
    console.error('query error', err.stack);
  }
}
exports.getTaskById = getTaskById;