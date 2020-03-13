// $(document).ready(function () {
//     let adjustment;
//     $("ul.list-group").sortable({
//       group: 'list-group',
//       pullPlaceholder: false,
//       // animation on drop
//       onDrop: function ($item, container, _super) {
//         let $clonedItem = $('<li/>').css({
//           height: 0
//         });
//         $item.before($clonedItem);
//         $clonedItem.animate({
//           'height': $item.height()
//         });
//         $item.animate($clonedItem.position(), function () {
//           $clonedItem.detach();
//           _super($item, container);
//         });
//       },
//       // set $item relative to cursor position
//       onDragStart: function ($item, container, _super) {
//         let offset = $item.offset(),
//           pointer = container.rootGroup.pointer;
//         adjustment = {
//           left: pointer.left - offset.left,
//           top: pointer.top - offset.top
//         };
//         _super($item, container);
//       },
//       onDrag: function ($item, position) {
//         $item.css({
//           left: position.left - adjustment.left,
//           top: position.top - adjustment.top
//         });
//       }
//     });
//   });
$(document).ready( function() {
    console.log("Inside dragdrop.js")
    $( ".draggable" ).draggable();
  } );