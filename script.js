// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var timeBlock;
  var description;
  var saveBtn = $(".saveBtn");
  saveBtn.on("click", function () {
    timeBlock = $(this).parent().attr("id");
    description = $(this).siblings(".description").val();
    localStorage.setItem(timeBlock, description);
  });

  var timeBlocks = $(".time-block");
  var currentHour = dayjs().hour();
  timeBlocks.each(function () {
    var timeBlockHour = parseInt($(this).attr("id").split("-")[1]);
    if (timeBlockHour < currentHour) {
      $(this).addClass("past");
    } else if (timeBlockHour === currentHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  });

  timeBlocks.each(function () {
    timeBlock = $(this).attr("id");
    var savedDescription = localStorage.getItem(timeBlock);
    if (savedDescription !== null) {
      description = $(this).children(".description").val(savedDescription);
    }
  });

  var currentDay = dayjs().format("dddd, MMMM D");
  $("#currentDay").text(currentDay);

  var currentTime = dayjs().format("h:mm A");
  $("#currentTime").text(currentTime);
});
