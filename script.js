$(document).ready(function () {


  
  // Get the current date and format it
  var currentDay = dayjs().format("dddd, MMMM D, YYYY");
  $("#currentDay").text(currentDay);

  // Add a click event listener to all save buttons
  $(".saveBtn").on("click", function () {
    // Retrieve the user input from the associated textarea
    var userInput = $(this).siblings(".description").val().trim();
  
    // Retrieve the time-block's ID as the key
    var timeBlockId = $(this).parent().attr("id");
  
    // Save the user input in local storage using the time-block's ID as the key
    localStorage.setItem(timeBlockId, userInput);
  });

  // Get the current hour using Day.js (or any date/time library of your choice)
  var currentHour = dayjs().hour();

  // Iterate through each time block
  $(".time-block").each(function () {
    var timeBlockHour = parseInt($(this).attr("id").split("-")[1]);

    // Apply the appropriate class based on the comparison
    if (timeBlockHour < currentHour) {
      $(this).addClass("past");
    } else if (timeBlockHour === currentHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  });

  // Retrieve user input from local storage and set textarea values
  $(".time-block").each(function () {
    var timeBlockId = $(this).attr("id");
    var savedInput = localStorage.getItem(timeBlockId);
    if (savedInput !== null) {
      $(this).find(".description").val(savedInput);
    }
  });
});