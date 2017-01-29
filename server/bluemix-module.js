
const INDEX_EMOTION_TONE = 0;

const INDEX_ANGER = 0;
const INDEX_DISGUST = 1;
const INDEX_FEAR = 2;
const INDEX_JOY = 3;
const INDEX_SADNESS = 4;

var watson = require('watson-developer-cloud');

var tone_analyzer = watson.tone_analyzer({
  username: '1b5ce608-1d3e-43cd-81cc-b87b60f7acda',
  password: 'lUjDY0wP2WNP',
  version: 'v3',
  version_date: '2016-05-19 '
});



function analyze(tweets){
    return Promise.all(tweets.map(t => analyzeEach(t)));
    
}

//tweet is a object with the follow characteristics:
//tweet.text is the tweet text
//tweet.retweet_count is the number of retweets
//tweet.name is the username behind the tweet 
function analyzeEach(tweet){
    return new Promise(function(resolve, reject){
        tone_analyzer.tone({ text: tweet.text },
          function(err, tone) {
            if (err)
                reject(err);
            else{
                /*
                // console.log(tone.document_tone.tone_categories[0]);
                // console.log(tone.document_tone.tone_categories[1]);
                console.log(tweet.text);
                console.log(tone.document_tone.tone_categories[2].tones[3].score);
                // */
                
                // TODO: Weight retweet_count
                
                let returnObject = Object.assign({}, tweet, {tone: mapTonesToScores(tone["document_tone"].tone_categories[INDEX_EMOTION_TONE].tones)});
                resolve(returnObject);
                // Use to find/update indices
                // console.log(tone["document_tone"].tone_categories[INDEX_EMOTION_TONE].tones);
            }
              //console.log(JSON.stringify(tone, null, 2));
        });
    });
}

function mapTonesToScores(tones)
{
    let tone = {};
    
    tones.forEach(function(t)
    {
        tone[t.tone_id] = t.score;
    });
    
    return tone;
}

/*
var test = [
    "No, no, no, no, no! I won't have abortion in this world.",
    "I fucking love abortion.",
    "Please. I don't want to comment on the issue."
].map(function(tText)
{
    return {
        text: tText,
        retweet_count: "1",
        name: "Hi"
    };
})
analyze(test);
// */

module.exports = {analyze};

