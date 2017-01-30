var watson = require('watson-developer-cloud');
var alchemy_language = watson.alchemy_language({
  api_key:  "68ce0f6fa0fc806efd2c6fcdce55202a343ac201"
})


function analyze(tweet){
    // /*
    return new Promise(function (resolve, reject){
        let parameters = {
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
              // console.log(rtnObj);
              resolve(rtnObj);
          }
        });
    })
    // */
    
    /*
    let val = 2 * Math.random() - 1;
    let type;
    
    if (-0.2 < val && val < 0.2)
        type = 'neutral';
    else if (val > 0)
        type = 'positive';
    else
        type = 'negative';
    
    let rtnObj;
    if (type == 'neutral')
    {
        rtnObj = Object.assign({}, tweet, {
            agreeType: type
        });
    }
    else
    {
        rtnObj = Object.assign({}, tweet, {
            agreeType: type,
            agreeScore: val
        });
    }
    
    return Promise.resolve(rtnObj);
    // */
}

module.exports = {analyze};

