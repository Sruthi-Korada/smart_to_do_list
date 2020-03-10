const { addTask, getTaskById } = require('./database');
const express = require('express');
// const router  = express.Router();

const SerpWow = require('google-search-results-serpwow');
// create the serpwow object
let serpwow = new SerpWow('680DE5388756457FAED398B25A3A9593');


/**
 * 1 - Pre-defined tags with the keywords used to categorize the task
 * 2 - Build the regex with tags
 * 3 - Combines all regex into object to pass into function to categorize the task
 */
// 1
const movieTags = ['film', 'directed', 'imdb', 'starring', 'television', 'netflix', 'tv', 'sitcom', 'amazonprime'];
const bookTags = ['published', 'novel', 'author', 'non-fiction', 'book', 'paperback', 'novels'];
const foodTags = ['menu', 'yelp', 'foodora', 'restaurant', 'ubereats'];

// 2
const movieRegex = buildRegex(movieTags);
const bookRegex = buildRegex(bookTags);
const foodRegex = buildRegex(foodTags);

// 3
const regexObj = {
  1: movieRegex,
  2: bookRegex,
  3: foodRegex
};

/**
 * returns regex as an object
 * @param {Array} keywords for each specific category
 * @return {Object} Object with regex
 */
function buildRegex(tags) {
  return new RegExp("\\b(" + tags.join('|') + ")\\b", "ig")
}

/**
 * Get the user input and filter if there's a verb on that string by using our constructed object
 * @param {String}task The user input
 * @return {Boolean}false||{CategoryID}
 */
const categorizeByVerb = function (task) {
  const verbs = {
    watch: { 1: 'movies' },
    read: { 2: 'books' },
    order: { 2: 'restaurants' },
    buy: { 4: 'products' }
  };
  const key = task.toLowerCase().split(' ');
  if (key.length > 1 && verbs.hasOwnProperty(key[0])) {
    return Number(Object.keys(verbs[key[0]]));
  }
  return false;
}

/**
 * return top 10 organic search results from google
 * https://www.npmjs.com/package/google-search-results-serpwow
 * @param {String} what the user inputs
 * @return {[Objects]} what the function returns
 */
const getSearchResults = (queryString) => {
  return new Promise(async (resolve, reject) => {
    let result = await serpwow.json({
      q: queryString,
      gl: 'ca',
      hl: 'en',
      location: 'Toronto,Ontario,Canada',
      google_domain: 'google.ca',
      num: 3
    });
    try {
      if (!result.organic_results) {
        resolve(result.local_results);

      } else {
        resolve(result.organic_results);
      }

    } catch (err) {
      reject(err.message);

    }
  });
}

/**
 * returns string with all results of API call
 * @param {Array} objects of top 10 google search
 * @return {String} to use in next function
 */
const combineResults = (arr) => {
  let str = '';
  for (let obj of arr) {
    str += str.concat(' ', obj.title.concat(' ', obj.snippet));
  }
  return str.toLowerCase();
}

/**
 * Returns category id
 * @param {String} final results from api results to compare against specific keywords
 * @return {Number} category_id
 */
const getCategory = function (string) {
  let arr = [];
  result = null;

  for (const regex in regexObj) {
    if (string.match(regexObj[regex]) && string.match(regexObj[regex]).length > arr.length) {
      arr = string.match(regexObj[regex]);
      result = Number(regex);
    }
  }
  if (!result) {
    result = 4;
  }
  return result;
}

/**
 * Calls addTask function and inserts task into database
 * @param {String} task from user input
 * @return nothing yet..??? maybe something later
 */
const categorizeTask =  async (obj) => {
  const { task, user_id } = obj;

  // check if task already exists for that user
  const tasks = await getTaskById(user_id);
  for (t of tasks) {
    if (t.input.toLowerCase() === task.toLowerCase()) {
      return { msg : 'Duplicate task. Please try another.'};

    }
  }

  const res = categorizeByVerb(task);

  const input = {
    task: task,
    user_id: user_id,
    category_id: res
  }

  if (res) {
    const newTask = await addTask(input);
    return newTask;
    //calls function that renders new task already categorized in user's main page
  } else {
    return getSearchResults(task)
      .then(res => {
        return combineResults(res);

      })
      .then(res => {
        return getCategory(res);

      })
      .then(res => {
        input.category_id = res;
        const newTask = addTask(input);
        return newTask;

      })
      .catch(err => {
        console.error('query error', err.stack);

      });
  }
}

module.exports = { categorizeTask };
