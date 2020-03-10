$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});
const createTask = function(task) {
  let $task = $(`
<div class="container">
<div class="card-deck categories">
  <!-- to read list column -->
  <div class="card read-list">
    <h5 class="card-header" id="read-header"><img src="img/book.png" alt="" width="30" height="30" /> To Read</h5>
    <div class="card-block" id="read-block">
      <ul class="list-group list-group-flush" id="read-items">
      </ul>
    </div>
  </div>
  <!-- to watch list column -->
  <div class="card watch-list">

    <h5 class="card-header" id="watch-header"><img src="img/tv.png" alt="" width="30" height="30"/> To Watch</h5>
    <div class="card-block" id="watch-block">
      <ul class="list-group list-group-flush" id="watch-items">
      </ul>
    </div>
  </div>
  <!-- to buy list column -->
  <div class="card buy-list">
    <h5 class="card-header" id="buy-header"><img src="img/buy.png" alt="" width="30" height="30"/> To Buy</h5>
    <div class="card-block" id="buy-block">
      <ul class="list-group list-group-flush" id="buy-items">
      </ul>
    </div>
  </div>
  <!-- to eat list column -->
  <div class="card eat-list">
    <h5 class="card-header" id="eat-header"><img src="img/eat.png" alt="" width="30" height="30"/> To Eat</h5>
    <div class="card-block" id="eat-block">
      <ul class="list-group list-group-flush" id="eat-items">
      </ul>
    </div>
  </div>
</div>`)
}
