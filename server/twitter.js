
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

let key = JSON.parse('key.json');
let accessToken = key.accessToken;


function initServer()
{
    ensureHasKey()
    .then(function(resAccessToken)
    {
        app.post(PATH_POST, function(req, res)
        {
            console.log('<>Rx:'); // TEST: Rx
            console.log(req.body);
            
            // Checks if keywords were given and proceeds accordingly
            if (req.body.keyword != undefined)
            {
                // Fetches Twitter data as a JSON object
                fetchTwitter(getURL(req.body.keyword))
                .catch(function(e)
                {
                    if (e != undefined)
                    {
                        res.json(getResponseJSON(false, "Could not fetch data"));
                    }
                    return Promise.reject();
                })
                // Processes JSON data for parsing by machine learning library
                .then(function(jsonData)
                {
                    if (jsonData.errors != undefined) // && jsonData.errors.length != 0
                    {
                        return Promise.reject(jsonData.errors);
                    }
                    
                    return jsonData; // TODO: Process JSON data
                })
                // Parses the processed tweets into output data
                .then(function(processedTweets)
                {
                    
                    
                    return processedTweets; // TODO: Call Moe's thing
                })
                // Formats library output for sending to client
                .then(function(output)
                {
                    let response = output;
                    
                    
                    
                    
                    return response; // TODO: Format response
                })
                // Sends reponse to client
                .then(function(response)
                {
                    console.log('<>Tx:') // TEST: Tx
                    console.log(response);
                    
                    res.json(getResponseJSON(true, response));
                })
                .catch(function (e)
                {
                    if (e != undefined)
                    {
                        res.json(getResponseJSON(false, e));
                    }
                });
                
            }
            else
            {
                res.json(getResponseJSON(false, "No keyword(s) specified"));
            }
        });
    })
    .catch(function (e)
    {
        console.log('<>ER:'); // TEST: ER
        console.log(e);
    });
}

function getResponseJSON(success, body)
{
    return {
        "success": success,
        "body": body,
    };
}

function fetchTwitter(keywords)
{
    return fetch(getURL(keywords))
    .then(function(res)
    {
        return res.json()
    })
    .then(function(jsonData)
    {
        console.log('<>Dt:'); // TEST: Dt
        console.log(jsonData);
        
        return jsonData;
    })
    .catch(function(e)
    {
        res.status(400).send("Malformed data received from Twitter");
        return Promise.reject();
    });
    
}

function getURL(keywords)
{
    return 'https://api.twitter.com/1.1/search/tweets.json?result_type=popular&count=' + NUM_TWEETS + '&q=' + encodeURI(keywords);
}

function ensureHasAccessTokey()
{
    if (accessToken == undefined)
    {
        return getAccessToken();
    }
    else
    {
        return Promise.resolve(accessToken);
    }
}

function getAccessToken()
{
    if (key.consumerKey == undefined || key.consumerSecret == undefined)
        return;
    
    let encodedKey = btoa(key.consumerKey + ":" + key.consumerSecret);
    
    return fetch('https://api.twitter.com/oauth2/token',
        {
            method: 'POST',
            body: 'grant_type=client_credentials',
            headers: {
                'authorization': 'Basic ' + encodedKey,
                'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
            }
        })
    .then(function(res)
    {
        return res.text() // TEST
    })
    .then(function(data)
    {
        // TODO: Set key, save key
        
        console.log("<>DA:"); // TEST: DA
        console.log(data);
        
        return data; // TODO: Return key
    })
    .catch(function(e)
    {
        console.log("<>EA: "); // TEST: EA
        console.log(e);
    });
    
}

initServer();

