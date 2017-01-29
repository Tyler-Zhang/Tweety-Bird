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
    return new Promise(resolve, reject){
        tone_analyzer.tone({ text: tweet.text },
          function(err, tone) {
            if (err)
              reject(err);
            else{
                let text, name, toneData, retweet;
                text = tweet.text;
                name = tweet.name;
                retweet = tweet.retweet_count;
                toneData = JSON.stringify(tone, null, 2);
                               
                resolve({text, name, toneData, retweet})
            }
              //console.log(JSON.stringify(tone, null, 2));
        });
    } 
}
