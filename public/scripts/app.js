// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   })
// })
function loadItems(callback) {
  $.ajax({
    method: 'GET',
    url: '/api/tasks',
    data: JSON,
    success: callback
  });
}
$(document).ready(function () {

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


  const $submitForm = $('#submit-form');
  $submitForm.submit((event) => {
    // prevent page refresh
    event.preventDefault();
    $.ajax('/api/tasks', {
      method: 'POST',
      contentType: 'application/x-www-form-urlencoded',
      data: $('#submit-form').serialize(),
      success: (data) => {
        // let $task = `
        // <li>
        //   ${data.input}
        // </li>
        // `;
        // $('#read-items').append($task)
        if (data.category_id === 1) {
          let $task = `<li>
            ${data.input}
          </li>
          `;
          $('#read-items').append($task)
        } else if (data.category_id === 2) {
          let $task = `<li>
          ${data.input}
        </li>
        `;
          $('#watch-items').append($task)
        } else if (data.category_id === 3) {
          let $task = `<li>
          ${data.input}
        </li>
        `;
          $('#buy-items').append($task)
        } else {
          let $task = `<li>
          ${data.input}
        </li>
        `;
          $('#eat-items').append($task)
        }
      }
    })
  })
})
