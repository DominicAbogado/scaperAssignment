function getSaved() {
    $("#articles").empty();
    $.getJSON("/saved-articles", function (data) {
        // For each one
        for (var i = 0; i < data.length; i++) {
            // Display the apropos information on the page
            $("#articles").append(`<div class="articleWrapper" data-id="${data[i]._id}">
            <h3>${data[i].title}</h3>
            <div class="articleLink"><a href="${data[i].link}" target="_blank">Click here to view Article!</a></div>
            <div class="articlePreview">
            ${data[i].preview}</div><button class="addNote" data-id="${data[i]._id}">Add Note</button>
            </div><button id="removeSaved" data-id="${data[i]._id}">Remove from Favourites</button>
            </div>`);

            console.log(data[i])
        }
    });
}

$("#showSaved").on("click", function () {
    console.log("Working")
    getSaved();
});


$(document).on("click", "#removeSaved", function () {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
            method: "POST",
            url: "/remove/" + thisId,
            data: {
                // Value taken from title input
                saved: false,
            }
        })
        // With that done
        .then(function (data) {
            // Log the response
            console.log(data);
            // Empty the notes section
            $("#notes").empty();
        });
    getSaved();
});

// When you click the addNote button
$(document).on("click", ".addNote", function () {
    // Grab the id associated with the article from the submit button
    $("#notes").empty();
    var thisId = $(this).attr("data-id");
    // AJAX Call to get articles
    $.ajax({
            method: "GET",
            url: "/saved-articles/" + thisId,
        })
        // With that done, add the note information to the page
        .then(function (data) {
            var data = data[0];
            console.log("localhost:8080/saved-articles/" + thisId)
            console.log(data.title);
            // The title of the article
            $("#notes").append("<h2>" + data.title + "</h2>");
            // An input to enter a new title
            $("#notes").append("<input id='titleinput' name='title' >");
            // A textarea to add a new note body
            $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
            // A button to submit a new note, with the id of the article saved to it
            $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

            // If there's a note in the article
            if (data.note) {
                // Place the title of the note in the title input
                $("#titleinput").val(data.note.title);
                // Place the body of the note in the body textarea
                $("#bodyinput").val(data.note.body);
            };
        });
});

$(document).on("click", "#savenote", function () {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
            method: "POST",
            url: "/saved-articles/" + thisId,
            data: {
                // Value taken from title input
                title: $("#titleinput").val(),
                // Value taken from note textarea
                body: $("#bodyinput").val()
            }
        })
        // With that done
        .then(function (data) {
            // Log the response
            console.log(data);
            // Empty the notes section
            $("#notes").empty();
        });

    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
});