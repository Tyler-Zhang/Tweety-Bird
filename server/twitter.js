
const PATH_POST = '/post';
// const PATH_MOE = ''; // TODO

const NUM_TWEETS = 6;

const http = require('http');
const express = require('express');

const fetch = require('node-fetch');
const bodyParser = require('body-parser');

// const moe = require('moe'); // TODO

let app = express();
app.use(bodyParser.json());

let httpServer = http.createServer(app).listen(80);

function initServer() {
    app.post(PATH_POST, function(req, res) {
        console.log('<>Rx: ' + req.body.keyword); // TEST
        
        if (req.body.keyword != null)
        {
            let data = fetchTwitter(getURL(keyword))
                .catch(function(e)
                {
                    res.status(400).send("Could not fetch data");
                });
            let parsedData = parseTweets(data);
            
            // TODO: Call Moe's thing
            
            let response = 'TEST_RESPONSE'; // TODO: Format response
            
            console.log('<>Tx: ' + response); // TEST
            res.send(response);
        }
        else
        {
            res.status(400).send("No keyword(s) specified");
        }
    });
}

function fetchTwitter(keywords) {
    
    fetch(getURL(keywords))
        .then(function(res)
        {
            let data = res.json();
            console.log('<>Dt:\n' + data); // TEST
            
            return data;
        });
    
}

function getURL(keywords) {
    return 'https://api.twitter.com/1.1/search/tweets.json?result_type=popular&count=' + NUM_TWEETS + '&q=' + encodeURI(keywords);
}

initServer();

