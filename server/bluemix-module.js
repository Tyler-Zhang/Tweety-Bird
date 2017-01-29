
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
    return {
        'joy': tones[INDEX_JOY].score,
        'sadness': tones[INDEX_SADNESS].score,
        'fear': tones[INDEX_FEAR].score,
        'disgust': tones[INDEX_DISGUST].score,
        'anger': tones[INDEX_ANGER].score
    };
}

module.exports = {analyze};

