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
$(document).ready(function(){  
  const $submitForm = $('#submit-form');
  $submitForm.submit((event) => {
    // prevent page refresh
    event.preventDefault();
    $.ajax('/api/tasks', {
      method: 'POST',
      contentType: 'application/x-www-form-urlencoded',
      data: $('#submit-form').serialize(),
      success: (data) => {
        let $task = `
        <li>
          ${data.input}
        </li>
        `;
        $('#read-items').append($task)
      }
    })
  })
})
