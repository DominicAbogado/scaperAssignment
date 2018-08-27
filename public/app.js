// Grab the articles as a json

function getArticles() {
  $("#articles").empty();
  $.getJSON("/articles", function (data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $("#articles").append
      (`<div class="articleWrapper" data-id="${data[i]._id}">
      <h3>${data[i].title}</h3>
      <div class="articleLink"><a href="${data[i].link}" target="_blank">Click here to view Article!</a></div>
      <div class="articlePreview">
      ${data[i].preview}</div>
      <button class="saveButton" data-id="${data[i]._id}">Save to Favourites</button>
      `);
      
      console.log(data[i])
    }
  });
};

getArticles();


$(document).on("click", ".saveButton", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/addsave/" + thisId,
    data: {
      // Value taken from title input
      saved: true,
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });
  });

  
$("#scrapeButton").on("click", function () {
  getArticles();
});
