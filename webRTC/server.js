var express = require("express");
var path = require("path");


// Set up the Express App
var app = express();
var PORT = process.env.PORT || 8080;


// ROUTES
// ==========================================================

// Find all books marked as unread
app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});

// Start the server to begin listening 
app.listen(PORT, function(){
	console.log('App listening on PORT ' + PORT);
})
