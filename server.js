var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
var PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');

var personality_insights = new PersonalityInsightsV3({
  username: 'ee935a33-ed27-4bb8-bf9d-b386b29e888b',
  password: 'mg0dLVOrGQSY',
  version_date: '2016-10-20'
});

var inputText = "";

var params_insight = {
  // Get the content items from the JSON file.
  content_items: require('./profile.json').contentItems,
  text: inputText,
  consumption_preferences: true,
  raw_scores: true,
  headers: {
    'accept-language': 'en',
    'accept': 'application/json'
  }
};

function getInsights() {
  personality_insights.profile(params_insight, function(error, response) {
    if (error)
      console.log('Error:', error);
    else
      return JSON.stringify(response, null, 2);
    }
  );  
}


// Set up the Express App
var app = express();
var PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: true}));

// ROUTES
// ==========================================================


app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.post("/findInsight", function(req, res) {
	inputText = req.body;
	res.send(getInsights());
});

// Start the server to begin listening 
app.listen(PORT, function(){
	console.log('App listening on PORT ' + PORT);
})
