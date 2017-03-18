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



function getInsights(callback) {
	var insights;
	personality_insights.profile(params_insight, function(error, response) {
	    if (error)
	      console.log('Error:', error);
	    else
	      insights = JSON.stringify(response, null, 2);

	  	// insights = response;
	  	// console.log(insights);
	  	insights = callback(response);	
	    });  
	return insights;
}



// Set up the Express App
var app = express();
var PORT = process.env.PORT || 8081;

app.use(bodyParser.urlencoded({extended: true}));

// ROUTES
// ==========================================================


app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.post("/findInsight", function(req, res) {
	inputText = req.body.text;
	console.log(inputText);
	personality_insights.profile(params_insight, function(error, response) {
	    if (error)
	      console.log('Error:', error);
	    else
	      res.send(JSON.stringify(response, null, 2));
	    });  
});

// Start the server to begin listening 
app.listen(PORT, function(){
	console.log('App listening on PORT ' + PORT);
})


// var inputText = `
// Eyes mark the shape of the city.

// Through the eyes of a high-flying night bird, we take in the scene from midair. In our broad sweep, the city looks like a single gigantic creature—or more like a single collective entity created by many intertwining organisms. Countless arteries stretch to the ends of its elusive body, circulating a continuous supply of fresh blood cells, sending out new data and collecting the old, sending out new consumables and collecting the old, sending out new contradictions and collecting the old. To the rhythm of its pulsing, all parts of the body flicker and flare up and squirm. Midnight is approaching, and while the peak of activity has passed, the basal metabolism that maintains life continues undiminished, producing the basso continuo of the city’s moan, a monotonous sound that neither rises nor falls but is pregnant with foreboding.

// Our line of sight chooses an area of concentrated brightness and, focusing there, silently descends to it—a sea of neon colors. They call this place an “amusement district.” The giant digital screens fastened to the sides of buildings fall silent as midnight approaches, but loudspeakers on storefronts keep pumping out exaggerated hip-hop bass lines. A large game center crammed with young people; wild electronic sounds; a group of college students spilling out from a bar; teenage girls with brilliant bleached hair, healthy legs thrusting out from micromini skirts; dark-suited men racing across diagonal crosswalks for the last trains to the suburbs. Even at this hour, the karaoke club pitchmen keep shouting for customers. A flashy black station wagon drifts down the street as if taking stock of the district through its black-tinted windows. The car looks like a deep-sea creature with specialized skin and organs. Two young policemen patrol the street with tense expressions, but no one seems to notice them. The district plays by its own rules at a time like this. The season is late autumn. No wind is blowing, but the air carries a chill. The date is just about to change.

 

// We are inside a Denny’s.

// Unremarkable but adequate lighting; expressionless decor and dinnerware; floor plan designed to the last detail by management engineers; innocuous background music at low volume; staff meticulously trained to deal with customers by the book: “Welcome to Denny’s.” Everything about the restaurant is anonymous and interchangeable. And almost every seat is filled.

// After a quick survey of the interior, our eyes come to rest on a girl sitting by the front window. Why her? Why not someone else? Hard to say. But, for some reason, she attracts our attention—very naturally. She sits at a four-person table, reading a book. Hooded gray parka, blue jeans, yellow sneakers faded from repeated washing. On the back of the chair next to her hangs a varsity jacket. This, too, is far from new. She is probably college freshman age, though an air of high school still clings to her. Hair black, short, and straight. Little makeup, no jewelry. Small, slender face. Black-rimmed glasses. Every now and then, an earnest wrinkle forms between her brows.

// She reads with great concentration. Her eyes rarely move from the pages of her book—a thick hardback. A bookstore wrapper hides the title from us. Judging from her intent expression, the book might contain challenging subject matter. Far from skimming, she seems to be biting off and chewing it one line at a time.

// On her table is a coffee cup. And an ashtray. Next to the ashtray, a navy blue baseball cap with a Boston Red Sox “B.” It might be a little too large for her head. A brown leather shoulder bag rests on the seat next to her. It bulges as if its contents had been thrown in on the spur of the moment. She reaches out at regular intervals and brings the coffee cup to her mouth, but she doesn’t appear to be enjoying the flavor. She drinks because she has a cup of coffee in front of her: that is her role as a customer. At odd moments, she puts a cigarette between her lips and lights it with a plastic lighter. She narrows her eyes, releases an easy puff of smoke into the air, puts the cigarette into the ashtray, and then, as if to soothe an approaching headache, she strokes her temples with her fingertips.

// The music playing at low volume is “Go Away Little Girl” by Percy Faith and His Orchestra. No one is listening, of course. Many different kinds of people are taking meals and drinking coffee in this late-night Denny’s, but she is the only female there alone. She raises her face from her book now and then to glance at her watch, but she seems dissatisfied with the slow passage of time. Not that she appears to be waiting for anyone: she doesn’t look around the restaurant or train her eyes on the front door. She just keeps reading her book, lighting an occasional cigarette, mechanically tipping back her coffee cup, and hoping for the time to pass a little faster. Needless to say, dawn will not be here for hours.

// She breaks off her reading and looks outside. From this second-story window she can look down on the busy street. Even at a time like this, the street is bright enough and filled with people coming and going—people with places to go and people with no place to go; people with a purpose and people with no purpose; people trying to hold time back and people trying to urge it forward. After a long, steady look at this jumbled street scene, she holds her breath for a moment and turns her eyes once again toward her book. She reaches for her coffee cup. Puffed no more than two or three times, her cigarette turns into a perfectly formed column of ash in the ashtray.

 

// The electric door slides open and a lanky young man walks in. Short black leather coat, wrinkled olive-green chinos, brown work boots. Hair fairly long and tangled in places. Perhaps he has had no chance to wash it in some days. Perhaps he has just crawled out of the underbrush somewhere. Or perhaps he just finds it more natural and comfortable to have messy hair. His thinness makes him look less elegant than malnourished. A big black instrument case hangs from his shoulder. Wind instrument. He also holds a dirty tote bag at his side. It seems to be stuffed with sheet music and other assorted things. His right cheek bears an eye-catching scar. It is short and deep, as if the flesh has been gouged out by something sharp. Nothing else about him stands out. He is a very ordinary young man with the air of a nice—but not very clever—stray mutt.

// The waitress on hostess duty shows him to a seat at the back of the restaurant. He passes the table of the girl with the book. A few steps beyond it, he comes to a halt as if a thought has struck him. He begins moving slowly backward as in a rewinding film, stopping at her table. He cocks his head and studies her face. He is trying to remember something, and much time goes by until he gets it. He seems like the type for whom everything takes time.

// The girl senses his presence and raises her face from her book. She narrows her eyes and looks at the young man standing there. He is so tall, she seems to be looking far overhead. Their eyes meet. The young man smiles. His smile is meant to show he means no harm.

 

// Sorry if I’ve got the wrong person,” he says, “but aren’t you Eri Asai’s little sister?”

// She does not answer. She looks at him with eyes that could be looking at an overgrown bush in the corner of a garden.

// “We met once,” he continues. “Your name is . . . Yuri . . . sort of like your sister Eri’s except the first syllable.”

// Keeping a cautious gaze fixed on him, she executes a concise factual correction: “Mari.”

// He raises his index finger and says, “That’s it! Mari. Eri and Mari. Different first syllables. You don’t remember me, do you?”

// Mari inclines her head slightly. This could mean either yes or no. She takes off her glasses and sets them down beside her coffee cup.

// The waitress retraces her steps and asks, “Are you together?”

// “Uh-huh,” he answers. “We are.”

// She sets his menu on the table. He takes the seat across from Mari and puts his case on the seat next to his. A moment later he thinks to ask Mari, “Mind if I sit here a while? I’ll get out as soon as I’m finished eating. I have to meet somebody.”

// Mari gives him a slight frown. “Aren’t you supposed to say that before you sit down?”

// He thinks about the meaning of her words. “That I have to meet somebody?”

// “No . . . ,” Mari says.

// “Oh, you mean as a matter of politeness.”

// “Uh-huh.”

// He nods. “You’re right. I should have asked if it’s okay to sit at your table. I’m sorry. But the place is crowded, and I won’t bother you for long. Do you mind?”

// Mari gives her shoulders a little shrug that seems to mean “As you wish.” He opens his menu and studies it.

// “Are you through eating?” he asks.

// “I’m not hungry.”

// With a scowl, he scans the menu, snaps it shut, and lays it on the table. “I really don’t have to open the menu,” he says. “I’m just faking it.”

// Mari doesn’t say anything.

// “I don’t eat anything but chicken salad here. Ever. If you ask me, the only thing worth eating at Denny’s is the chicken salad. I’ve had just about everything on the menu. Have you ever tried their chicken salad?”

// Mari shakes her head.

// “It’s not bad. Chicken salad and crispy toast. That’s all I ever eat at Denny’s.”

// “So why do you even bother looking at the menu?”

// He pulls at the wrinkles in the corner of one eye with his pinky finger. “Just think about it. Wouldn’t it be too sad to walk into Denny’s and order chicken salad without looking at the menu? It’s like telling the world, ‘I come to Denny’s all the time because I love the chicken salad.’ So I always go through the motion of opening the menu and pretending I picked the chicken salad after considering other things.”

// The waitress brings him water and he orders chicken salad and crispy toast. “Make it really crispy,” he says with conviction. “Almost burnt.” He also orders coffee for afterwards. The waitress inputs his order using a hand-held device and confirms it by reading it aloud.

// “And I think the young lady needs a refill,” he says, pointing at Mari’s cup.

// “Thank you, sir. I will bring the coffee right away.”

// He watches her go off.

// “You don’t like chicken?” he asks.

// “It’s not that,” Mari says. “But I make a point of not eating chicken out.”

// “Why not?”

// “Especially the chicken they serve in chain restaurants— they’re full of weird drugs. Growth hormones and stuff. The chickens are locked in these dark, narrow cages, and given all these shots, and their feed is full of chemicals, and they’re put on conveyor belts, and machines cut their heads off and pluck them . . .”

// “Whoa!” he says with a smile. The wrinkles at the corners of his eyes deepen. “Chicken salad à la George Orwell!”

// Mari narrows her eyes and looks at him. She can’t tell if he is making fun of her.

// “Anyhow,” he says, “the chicken salad here is not bad. Really.”

// As if suddenly recalling that he is wearing it, he takes off his leather coat, folds it, and lays it on the seat next to his. Then he rubs his hands together atop the table. He has on a green, coarse-knit crew-neck sweater. Like his hair, the wool of the sweater is tangled in places. He is obviously not the sort who pays a lot of attention to his appearance.

// “We met at a hotel swimming pool in Shinagawa. Two summers ago. Remember?”

// “Sort of.”

// “My buddy was there, your sister was there, you were there, and I was there. Four of us all together. We had just entered college, and I’m pretty sure you were in your second year of high school. Right?”

// Mari nods without much apparent interest.

// “My friend was kinda dating your sister then. He brought me along on like a double date. He dug up four free tickets to the pool, and your sister brought you along. You hardly said a word, though. You spent the whole time in the pool, swimming like a young dolphin. We went to the hotel tea room for ice cream afterwards. You ordered a peach melba.”

// Mari frowns. “How come you remember stuff like that?”

// “I never dated a girl who ate peach melba before. And you were cute, of course.”

// Mari looks at him blankly. “Liar. You were staring at my sister the whole time.”

// “I was?”

// Mari answers with silence.

// “Maybe I was,” he says. “For some reason I remember her bikini was really tiny.”

// Mari pulls out a cigarette, puts it between her lips, and lights it with her lighter.

// “Let me tell you something,” he says. “I’m not trying to defend Denny’s or anything, but I’m pretty sure that smoking a whole pack of cigarettes is way worse for you than eating a plate of chicken salad that might have some problems with it. Don’t you think so?”

// Mari ignores his question.

// “Another girl was supposed to go with my sister that time, but she got sick at the last minute and my sister forced me to go with her. To keep the numbers right.”

// “So you were in a bad mood.”

// “I remember you, though.”

// “Really?”

// Mari puts her finger on her right cheek.

// The young man touches the deep scar on his own cheek. “Oh, this. When I was a kid, I was going too fast on my bike and couldn’t make the turn at the bottom of the hill. Another inch and I would have lost my right eye. My earlobe’s deformed, too. Wanna see it?”

// Mari frowns and shakes her head.

// The waitress brings the chicken salad and toast to the table. She pours fresh coffee into Mari’s cup and checks to make sure she has brought all the ordered items to the table. He picks up his knife and fork and, with practiced movements, begins eating his chicken salad. Then he picks up a piece of toast, stares at it, and wrinkles his brow.

// “No matter how much I scream at them to make my toast as crispy as possible, I have never once gotten it the way I want it. I can’t imagine why. What with Japanese industriousness and high-tech culture and the market principles that the Denny’s chain is always pursuing, it shouldn’t be that hard to get crispy toast, don’t you think? So, why can’t they do it? Of what value is a civilization that can’t toast a piece of bread as ordered?”

// Mari doesn’t take him up on this.

// “But anyhow, your sister was a real beauty,” the young man says, as if talking to himself.

// Mari looks up. “Why do you say that in the past tense?”

// “Why do I . . . ? I mean, I’m talking about something that happened a long time ago, so I used the past tense, that’s all. I’m not saying she isn’t a beauty now or anything.”

// “She’s still pretty, I think.”

// “Well, that’s just dandy. But, to tell you the truth, I don’t know Eri Asai all that well. We were in the same class for a year in high school, but I hardly said two words to her. It might be more accurate to say she wouldn’t give me the time of day.”

// “You’re still interested in her, right?”

// The young man stops his knife and fork in midair and thinks for a moment. “Interested. Hmm. Maybe as a kind of intellectual curiosity.”

// “Intellectual curiosity?”

// “Yeah, like, what would it feel like to go out on a date with a beautiful girl like Eri Asai? I mean, she’s an absolute cover girl.”

// “You call that intellectual curiosity?”

// “Kind of, yeah.”

// “But back then, your friend was the one going out with her, and you were the other guy on a double date.”

// He nods with a mouthful of food, which he then takes all the time he needs to chew.

// “I’m kind of a low-key guy. The spotlight doesn’t suit me. I’m more of a side dish—cole slaw or French fries or a Wham! backup singer.”

// “Which is why you were paired with me.”

// “But still, you were pretty damn cute.”

// “Is there something about your personality that makes you prefer the past tense?”

// The young man smiles. “No, I was just directly expressing how I felt back then from the perspective of the present. You were very cute. Really. You hardly talked to me, though.”

// He rests his knife and fork on his plate, takes a drink of water, and wipes his mouth with a paper napkin. “So, while you were swimming, I asked Eri Asai, ‘Why won’t your little sister talk to me? Is there something wrong with me?’ “

// “What’d she say?”

// “That you never take the initiative to talk to anybody. That you’re kinda different, and that even though you’re Japanese you speak more often in Chinese than Japanese. So I shouldn’t worry. She didn’t think there was anything especially wrong with me.”

// Mari silently crushes her cigarette out in the ashtray.

// “It’s true, isn’t it? There wasn’t anything especially wrong with me, was there?”

// Mari thinks for a moment. “I don’t remember all that well, but I don’t think there was anything wrong with you.”

// “That’s good. I was worried. Of course, I do have a few things wrong with me, but those are strictly problems I keep inside. I’d hate to think they were obvious to anybody else. Especially at a swimming pool in the summer.”

// Mari looks at him again as if to confirm the accuracy of his statement. “I don’t think I was aware of any problems you had inside.”

// “That’s a relief.”

// “I can’t remember your name, though,” Mari says.

// “My name?”

// “Your name.”

// He shakes his head. “I don’t mind if you forgot my name. It’s about as ordinary as a name can be. Even I feel like forgetting it sometimes. It’s not that easy, though, to forget your own name. Other people’s names—even ones I have to remember—I’m always forgetting.”

// He glances out the window as if in search of something he should not have lost. Then he turns toward Mari again.

// “One thing always mystified me, and that is, why didn’t your sister ever get into the pool that time? It was a hot day, and a really nice pool.”

// Mari looks at him as if to say, You mean you don’t get that, either? “She didn’t want her makeup to wash off. It’s so obvious. And you can’t really swim in a bathing suit like that.”

// “Is that it?” he says. “It’s amazing how two sisters can be so different.”

// “We live two different lives.”

// He thinks about her words for a few moments and then says, “I wonder how it turns out that we all lead such different lives. Take you and your sister, for example. You’re born to the same parents, you grow up in the same household, you’re both girls. How do you end up with such wildly different personalities? At what point do you, like, go your separate ways? One puts on a bikini like little semaphore flags and lies by the pool looking sexy, and the other puts on her school bathing suit and swims her heart out like a dolphin . . .”

// Mari looks at him. “Are you asking me to explain it to you here and now in twenty-five words or less while you eat your chicken salad?”

// He shakes his head. “No, I was just saying what popped into my head out of curiosity or something. You don’t have to answer. I was just asking myself.”

// He starts to work on his chicken salad again, changes his mind, and continues:

// “I don’t have any brothers or sisters, so I just wanted to know: up to what point do they resemble each other, and where do their differences come in?”

// Mari remains silent while the young man with the knife and fork in his hands stares thoughtfully at a point in space above the table.

// Then he says, “I once read a story about three brothers who washed up on an island in Hawaii. A myth. An old one. I read it when I was a kid, so I probably don’t have the story exactly right, but it goes something like this. Three brothers went out fishing and got caught in a storm. They drifted on the ocean for a long time until they washed up on the shore of an uninhabited island. It was a beautiful island with coconuts growing there and tons of fruit on the trees, and a big, high mountain in the middle. The night they got there, a god appeared in their dreams and said, ‘A little farther down the shore, you will find three big, round boulders. I want each of you to push his boulder as far as he likes. The place you stop pushing your boulder is where you will live. The higher you go, the more of the world you will be able to see from your home. It’s entirely up to you how far you want to push your boulder.’ “

// The young man takes a drink of water and pauses for a moment. Mari looks bored, but she is clearly listening.

// “Okay so far?” he asks.

// Mari nods.

// “Want to hear the rest? If you’re not interested, I can stop.”

// “If it’s not too long.”

// “No, it’s not too long. It’s a pretty simple story.”

// He takes another sip of water and continues with his story.

// “So the three brothers found three boulders on the shore just as the god had said they would. And they started pushing them along as the god told them to. Now these were huge, heavy boulders, so rolling them was hard, and pushing them up an incline took an enormous effort. The youngest brother quit first. He said, ‘Brothers, this place is good enough for me. It’s close to the shore, and I can catch fish. It has everything I need to go on living. I don’t mind if I can’t see that much of the world from here.’ His two elder brothers pressed on, but when they were midway up the mountain, the second brother quit. He said, ‘Brother, this place is good enough for me. There is plenty of fruit here. It has everything I need to go on living. I don’t mind if I can’t see that much of the world from here.’ The eldest brother continued walking up the mountain. The trail grew increasingly narrow and steep, but he did not quit. He had great powers of perseverance, and he wanted to see as much of the world as he possibly could, so he kept rolling the boulder with all his might. He went on for months, hardly eating or drinking, until he had rolled the boulder to the very peak of the high mountain. There he stopped and surveyed the world. Now he could see more of the world than anyone. This was the place he would live—where no grass grew, where no birds flew. For water, he could only lick the ice and frost. For food, he could only gnaw on moss. Be he had no regrets, because now he could look out over the whole world. And so, even today, his great, round boulder is perched on the peak of that mountain on an island in Hawaii. That’s how the story goes.”

// Silence.

// Mari asks, “Is it supposed to have some kind of moral?”

// “Two, probably. The first one,” he says, holding up a finger, “is that people are all different. Even siblings. And the other one,” he says, holding up another finger, “is that if you really want to know something, you have to be willing to pay the price.”

// Mari offers her opinion: “To me, the lives chosen by the two younger brothers make the most sense.”

// “True,” he concedes. “Nobody wants to go all the way to Hawaii to stay alive licking frost and eating moss. That’s for sure. But the eldest brother was curious to see as much of the world as possible, and he couldn’t suppress that curiosity, no matter how big the price was he had to pay.”

// “Intellectual curiosity.”

// “Exactly.”

// Mari went on thinking about this for a while, one hand perched on her thick book.

// “Even if I asked you very politely what you’re reading, you wouldn’t tell me, would you?” he asks.

// “Probably not.”

// “It sure looks heavy.”

// Mari says nothing.

// “It’s not the size book most girls carry around in their bags.”

// Mari maintains her silence. He gives up and continues his meal. This time, he concentrates his attention on the chicken salad and finishes it without a word. He takes his time chewing and drinks a lot of water. He asks the waitress to refill his water glass several times. He eats his final piece of toast.

 

// “Your house was way out in Hiyoshi, I seem to recall,” he says. His empty plates have been cleared away.

// Mari nods.

// “Then you’ll never make the last train. I suppose you can go home by taxi, but the next train’s not until tomorrow morning.”

// “I know that much,” Mari says.

// “Just checking,” he says.

// “I don’t know where you live, but haven’t you missed the last train, too?”

// “Not so far: I’m in Koenji. But I live alone, and we’re going to be practicing all night. Plus if I really have to get back, my buddy’s got a car.”

// He pats his instrument case like the head of a favorite dog.

// “The band practices in the basement of a building near here,” he says. “We can make all the noise we want and nobody complains. There’s hardly any heat, though, so it gets pretty cold this time of year. But they’re letting us use it for free, so we take what we can get.”

// Mari glances at the instrument case. “That a trombone?”

// “That’s right! How’d you know?”

// “Hell, I know what a trombone looks like.”

// “Well, sure, but there are tons of girls who don’t even know the instrument exists. Can’t blame ‘em, though. Mick Jagger and Eric Clapton didn’t become rock stars playing the trombone. Ever see Jimi Hendrix or Pete Townshend smash a trombone onstage? Of course not. The only thing they smash is electric guitars. If they smashed a trombone, the audience’d laugh.”

// “So why did you choose the trombone?”

// He puts cream in his newly arrived coffee and takes a sip.

// “When I was in middle school, I happened to buy a jazz record called Blues-ette at a used record store. An old LP. I can’t remember why I bought it at the time. I had never heard any jazz before. But anyway, the first tune on side A was ‘Five Spot After Dark,’ and it was great. A guy named Curtis Fuller played the trombone on it. The first time I heard it, I felt the scales fall from my eyes. That’s it, I thought. That’s the instrument for me. The trombone and me: it was a meeting arranged by destiny.”

// The young man hums the first eight bars of “Five Spot After Dark.”

// “I know that,” says Mari.

// He looks baffled. “You do?”

// Mari hums the next eight bars.

// “How do you know that?” he asks.

// “Is it against the law for me to know it?”

// He sets his cup down and lightly shakes his head. “No, not at all. But, I don’t know, it’s incredible. For a girl nowadays to know ‘Five Spot After Dark’ . . . Well, anyway, Curtis Fuller gave me pins and needles, and that got me started playing the trombone. I borrowed money from my parents, bought a used instrument, and joined the school band. Then in high school I started doing different stuff with bands. At first I was backing up a rock band, sort of like the old Tower of Power. Do you know Tower of Power?”

// Mari shakes her head.

// “It doesn’t matter,” he says. “Anyhow, that’s what I used to do, but now I’m purely into plain, simple jazz. My university’s not much of a school, but we’ve got a pretty good band.”

// The waitress comes to refill his water glass, but he waves her off. He glances at his watch. “It’s time for me to get out of here.”

// Mari says nothing. Her face says, Nobody’s stopping you.

// “Of course everybody comes late.”

// Mari offers no comment on that, either.

// “Hey, say hi from me to your sister, okay?”

// “You can do it yourself, can’t you? You know our phone number. How can I say hi from you? I don’t even know your name.”

// He thinks about that for a moment. “Suppose I call your house and Eri Asai answers, what am I supposed to talk about?”

// “Get her advice on a class reunion, maybe. You’ll think of something.”

// “I’m not much of a talker. Never have been.”

// “I’d say you’ve been talking a lot to me.”

// “With you, I can talk, somehow.”

// “With me, you can talk, somehow,” she parrots him. “But with my sister, you can’t talk?”

// “Probably not.”

// “Because of too much intellectual curiosity?”

// I wonder, says his vague expression. He starts to say something, changes his mind, and stops. He takes a deep breath. He picks up the bill from the table and begins calculating the money in his head.

// “I’ll leave what I owe. Can you pay for us both later?”

// Mari nods.

// He glances first at her and then at her book. After a moment’s indecision he says, “I know this is none of my business, but is something wrong? Like, problems with your boyfriend or a big fight with your family? I mean, staying in town alone by yourself all night . . .”

// Mari puts on her glasses and stares up at him. The silence between them is tense and chilly. He raises both palms toward her as if to say, Sorry for butting in.

// “I’ll probably be back here around five in the morning for a snack,” he says. “I’ll be hungry again. I hope I see you then.”

// “Why?”

// “Hmm, I wonder why.”

// “ ’Cause you’re worried about me?”

// “That’s part of it.”

// “ ’Cause you want me to say hi to my sister?”

// “That might be a little part of it, too.”

// “My sister wouldn’t know the difference between a trombone and a toaster oven. She could tell the difference between a Gucci and a Prada at a glance, though, I’m pretty sure.”

// “Everybody’s got their own battlefields,” he says with a smile.

// He takes a notebook from his coat pocket and writes something in it with a ballpoint pen. He tears the page out and hands it to her.

// “This is the number of my cell phone. Call me if anything happens. Uh, do you have a cell phone?”

// Mari shakes her head.

// “I didn’t think so,” he says as if impressed. “I sorta had this gut feeling, like, ‘I’ll bet she doesn’t like cell phones.’”

// The young man stands and puts on his leather coat. He picks up his trombone case. A hint of his smile still remains as he says, “See ya.”

// Mari nods, expressionless. Without really looking at the scrap of paper, she places it on the table next to the bill. She holds her breath for a moment, props her chin on her hand, and goes back to her book. Burt Bacharach’s “The April Fools” plays through the restaurant at low volume.

// `
