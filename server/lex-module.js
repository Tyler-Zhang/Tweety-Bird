const semantria = require("semantria-node");
const semantriaSession = new semantria.Session("8dc92076-5a84-4447-922c-78e5dc319309", "7789eec2-0fab-40be-88b0-e430dfb4ce02");


function analyzeEachSymantra(tweet){
    return new Promise(function(resolve, reject){
        let documentID = Date.now();
        let result = semantriaSession.queueDocument({
            id: documentID,
            text: tweet.text
        });
        if(result == 202){
            let data = semantriaSession.getDocument(documentID);
            let returnObject = Object.assign({}, tweet, {
                agree: data.sentiment_score,
                polarity: data.sentiment_polarity});
            resolve(returnObject);
        }
    });
}

module.exports.analyze = analyzeEachSymantra();