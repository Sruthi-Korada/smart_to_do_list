const { Pool } = require('pg');
const categories = require('./json/categories.json');
const users = require('./json/users.json');


const pool = new Pool({
  users: 'labber',
  password: '123', 
  host: 'localhost',
  database: 'midterm'
});
pool.connect();
const getUserWithEmail = function(email) {
    const queryString = `
    SELECT * FROM users
    WHERE email = $1;
    `;
    const queryParams = [email];
  
    return pool.query(queryString, queryParams)
      .then(res => {
        // user not found
        if (!res.rows[0]) return null;
        return res.rows[0];
      })
      .catch(err => console.error('\nerror fetching user:\n', err));
  }
  exports.getUserWithEmail = getUserWithEmail;
  