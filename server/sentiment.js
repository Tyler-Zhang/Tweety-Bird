var watson = require('watson-developer-cloud');
var alchemy_language = watson.alchemy_language({
  api_key:  "01e79e4c7beaafc0d26bfe16186721d9ffabde9d"
})



function analyze(tweet){
    return new Promise(function (resolve, reject){
        var parameters = {
          extract: 'doc-sentiment',
          sentiment: 1,
          text: tweet.text
        };
        alchemy_language.combined(parameters, function (err, response) {
          if (err)
            reject(err);
          else{
              let rtnObj = Object.assign({}, tweet, {
                  agreeType: response.docSentiment.type,
                  agreeScore: response.docSentiment.score
              });
              console.log(rtnObj);
              resolve(rtnObj);
          }
        });
    })
}

module.exports = {analyze};

