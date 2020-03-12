function loadItems(callback) {
  $.ajax({
    method: 'GET',
    url: '/api/tasks',
    data: JSON,
    success: callback
  });
}

function saveTask() {
  $(".loader").show();
  const readTags = ['published', 'novel', 'author', 'non-fiction', 'book', 'paperback', 'novels', 'booklet'];
  const watchTags = ['film', 'directed', 'imdb', 'starring', 'television', 'netflix', 'tv', 'sitcom',
    'amazonprime', 'screenplay', 'movie', 'theater', 'series', 'media'
  ];
  const foodTags = ['menu', 'yelp', 'foodora', 'restaurant', 'ubereats', 'edible', 'eat', 'food', 'fruit'];

  $.ajax({
    url: 'https://api.serpwow.com/live/search',
    data: {
      api_key: "89A1126FFB74445F8ECC871CFA848174",
      q: "wiki " + $("#itemInput").val()
    },
    type: 'GET',
    crossDomain: true,
    success: function (data) {
      let wikiSnippet = data["organic_results"]["0"]["snippet"];
      let categoryId;
      if (findInString(wikiSnippet, readTags)) {
        //alert("it is to read!" + wikiSnippet);
        categoryId = 1;
      } else if (findInString(wikiSnippet, watchTags)) {
        //alert("it is to watch!" + wikiSnippet);
        categoryId = 2;
      } else if (findInString(wikiSnippet, foodTags)) {
        //alert("it is to eat!" + wikiSnippet);
        categoryId = 4;
      } else {
        //alert("it is a product!" + wikiSnippet);
        categoryId = 3;
      }

      $.ajax('/api/tasks/add', {
        method: 'GET',
        data: {
          item_input: $("#itemInput").val(),
          category_id: categoryId
        },
        success: (data) => {
          $(".loader").hide();
          $("#itemInput").val("");
          let $task = `<li> ${data.input}</li>`;
          if (data.category_id === 1) {
            $('#read-items').append($task)
          } else if (data.category_id === 2) {
            $('#watch-items').append($task)
          } else if (data.category_id === 3) {
            $('#buy-items').append($task)
          } else {
            $('#eat-items').append($task)
          }
        },
        error: (data) => {
          $(".loader").hide();
        }
      })

    },
    error: function (error) {
      alert("error when loading google");
      $(".loader").hide();
    }
  });
}

function findInString(str, categoryVerb) {
  let words = str.match(/\b(\w+)\b/g);
  let found = false;
  words.forEach(word => {
    for (var i = 0; i < categoryVerb.length; i++) {
      if (categoryVerb[i].toLowerCase() === word.toLowerCase()) {
        found = true;
      }
    }
  });
  if (found) {
    return true;
  } else {
    return false;
  }
}


$(document).ready(function () {

  $(".loader").hide();

  const callbackLoadItems = function (data) {
    data["tasks"].forEach(element => {
      let task = `<li>${element["input"]}</li>`;
      let selectedCategory = element["category_id"];

      if (selectedCategory === 1) {
        $('#read-items').append(task);
      } else if (selectedCategory === 2) {
        $('#watch-items').append(task);
      } else if (selectedCategory === 3) {
        $('#buy-items').append(task);
      } else {
        $('#eat-items').append(task);
      }
    });
  }

  loadItems(callbackLoadItems);

})
