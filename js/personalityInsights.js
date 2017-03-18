var fs = require('fs');

var PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
var personality_insights = new PersonalityInsightsV3({
  username: 'ee935a33-ed27-4bb8-bf9d-b386b29e888b',
  password: 'mg0dLVOrGQSY',
  version_date: '2016-10-20'
});

// var inputText = "And so it is with our own past. It is a labour in vain to attempt to recapture it: all the efforts of our intellect must prove futile. The past is hidden somewhere outside the realm, beyond the reach of intellect, in some material object (in the sensation which that material object will give us) which we do not suspect. And as for that object, it depends on chance whether we come upon it or not before we ourselves must die.Many years had elapsed during which nothing of Combray, save what was comprised in the theatre and the drama of my going to bed there, had any existence for me, when one day in winter, as I came home, my mother, seeing that I was cold, offered me some tea, a thing I did not ordinarily take. I declined at first, and then, for no particular reason, changed my mind. She sent out for one of those short, plump little cakes called 'petites madeleines,' which look as though they had been moulded in the fluted scallop of a pilgrim's shell. And soon, mechanically, weary after a dull day with the prospect of a depressing morrow, I raised to my lips a spoonful of the tea in which I had soaked a morsel of the cake. No sooner had the warm liquid, and the crumbs with it, touched my palate than a shudder ran through my whole body, and I stopped, intent upon the extraordinary changes that were taking place. An exquisite pleasure had invaded my senses, but individual, detached, with no suggestion of its origin. And at once the vicissitudes of life had become indifferent to me, its disasters innocuous, its brevity illusory—this new sensation having had on me the effect which love has of filling me with a precious essence; or rather this essence was not in me, it was myself. I had ceased now to feel mediocre, accidental, mortal. Whence could it have come to me, this all-powerful joy? I was conscious that it was connected with the taste of tea and cake, but that it infinitely transcended those savours, could not, indeed, be of the same nature as theirs. Whence did it come? What did it signify? How could I seize upon and define it?I drink a second mouthful, in which I find nothing more than in the first, a third, which gives me rather less than the second. It is time to stop; the potion is losing its magic. It is plain that the object of my quest, the truth, lies not in the cup but in myself. The tea has called up in me, but does not itself understand, and can only repeat indefinitely with a gradual loss of strength, the same testimony; which I, too, cannot interpret, though I hope at least to be able to call upon the tea for it again and to find it there presently, intact and at my disposal, for my final enlightenment. I put down my cup and examine my own mind. It is for it to discover the truth. But how? What an abyss of uncertainty whenever the mind feels that some part of it has strayed beyond its own borders; when it, the seeker, is at once the dark region through which it must go seeking, where all its equipment will avail it nothing. Seek? More than that: create. It is face to face with something which does not so far exist, to which it alone can give reality and substance, which it alone can bring into the light of day.And I begin again to ask myself what it could have been, this unremembered state which brought with it no logical proof of its existence, but only the sense that it was a happy, that it was a real state in whose presence other states of consciousness melted and vanished. I decide to attempt to make it reappear. I retrace my thoughts to the moment at which I drank the first spoonful of tea. I find again the same state, illumined by no fresh light. I compel my mind to make one further effort, to follow and recapture once again the fleeting sensation. And that nothing may interrupt it in its course I shut out every obstacle, every extraneous idea, I stop my ears and inhibit all attention to the sounds which come from the next room. And then, feeling that my mind is growing fatigued without having any success to report, I compel it for a change to enjoy that distraction which I have just denied it, to think of other things, to rest and refresh itself before the supreme attempt. And then for the second time I clear an empty space in front of it. I place in position before my mind's eye the still recent taste of that first mouthful, and I feel something start within me, something that leaves its resting-place and attempts to rise, something that has been embedded like an anchor at a great depth; I do not know yet what it is, but I can feel it mounting slowly; I can measure the resistance, I can hear the echo of great spaces traversed.Undoubtedly what is thus palpitating in the depths of my being must be the image, the visual memory which, being linked to that taste, has tried to follow it into my conscious mind. But its struggles are too far off, too much confused; scarcely can I perceive the colourless reflection in which are blended the uncapturable whirling medley of radiant hues, and I cannot distinguish its form, cannot invite it, as the one possible interpreter, to translate to me the evidence of its contemporary, its inseparable paramour, the taste of cake soaked in tea; cannot ask it to inform me what special circumstance is in question, of what period in my past life."
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
      console.log(JSON.stringify(response, null, 2));
    }
  );  
}



// speech to text

var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
var speech_to_text = new SpeechToTextV1 ({
  username: 'd2978dba-5065-45b1-8bf7-7e04a9b9225d',
  password: 'bjVvUreKhVXf',
   headers: {
    'X-Watson-Learning-Opt-Out': 'true'
  }
});



// speech_to_text.getModels(null, function(error, models) {
//   console.log(models)
//   if (error)
//     console.log('Error:', error);
//   else
//     console.log(JSON.stringify(models, null, 2));
// });

var params_transcribe = {
  model: 'en-US_BroadbandModel',
  content_type: 'audio/flac',
  continuous: true,
  'interim_results': true,
  'max_alternatives': 3,
  'word_confidence': false,
  timestamps: false,
  keywords: ['colorado', 'tornado', 'tornadoes'],
  'keywords_threshold': 0.5
};

// Create the stream.
var recognizeStream = speech_to_text.createRecognizeStream(params_transcribe);

// Pipe in the audio.
fs.createReadStream('audio-file.flac').pipe(recognizeStream);

// Pipe out the transcription to a file.
recognizeStream.pipe(fs.createWriteStream('transcription.txt'));

// Get strings instead of buffers from 'data' events.
recognizeStream.setEncoding('utf8');

// Listen for events.
// recognizeStream.on('results', function(event) { onEvent('Results:', event); });
recognizeStream.on('data', function(event) { 
    // onEvent('Data:', event); 
    inputText = event;
    getInsights();
    console.log("inputText HERE!!!!! = " + inputText);
});
recognizeStream.on('error', function(event) { onEvent('Error:', event); });
recognizeStream.on('close', function(event) { onEvent('Close:', event); });
recognizeStream.on('speaker_labels', function(event) { onEvent('Speaker_Labels:', event); });

// Displays events on the console.
function onEvent(name, event) {
  console.log(name, JSON.stringify(event, null, 2));
};