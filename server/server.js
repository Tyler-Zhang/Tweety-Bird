
const PATH_CLIENT_BIN = '../client/bin/';
const PATH_POST = '/getData';
const NUM_PORT = 80;

const NUM_TWEETS = 25;

const PATH_KEY = 'key.json';
const PATH_BM_MODULE = './bluemix-module.js';
const PATH_GA_MODULE = './gender-module.js';
const PATH_SA_MODULE = './sentiment.js';


const http = require('http');
const express = require('express');

const fetch = require('node-fetch');
const bodyParser = require('body-parser');

var fs = require("fs");

const bmModule = require(PATH_BM_MODULE);
const gaModule = require(PATH_GA_MODULE);
const saModule = require(PATH_SA_MODULE);


let app = express();
app.use(bodyParser.json());
app.use(express.static(PATH_CLIENT_BIN)); // app.static(PATH_CLIENT_BIN) ?

let httpServer = http.createServer(app).listen(NUM_PORT);

let key;
let accessToken;



let args = process.argv.slice(2);

let regenerateKey = false;
let refreshKey = false;
let directOutput = false;
let verbose = false;

let invalidFlags = false;

let BreakException = {};

try
{
    key = JSON.parse(fs.readFileSync(PATH_KEY));
    
    if (args.length > 0)
    {
        args.forEach(function(flag, index)
        {
            if (flag == '-c')
            {
                regenerateKey = true;
            }
            else if (flag == '-r')
            {
                refreshKey = true;
            }
            else if (flag == '-v')
            {
                verbose = true;
            }
            else
            {
                invalidFlags = true;
                throw BreakException;
            }
        });
    }
    
    if (regenerateKey)
    {
        regenerateAccessToken();
    }
    else if (refreshKey)
    {
        getAccessToken();
    }
    else
    {
        accessToken = key.accessToken;
    }
    
    initServer();
}
catch (e)
{
    if (e == BreakException)
    {
        console.log('Options:');
        console.log('   -c - regenerate access token (invalidate current token and generate new token)');
        console.log('   -r - refresh access token (fetch current token from Twitter or generate new token if no current token exists)');
        console.log('   -v - verbose output');
        
        process.exit(2);
    }
    else
    {
        console.log('<>ER:'); // OUT: ER
        console.log('Could not read key file');
        console.log(e);
        
        process.exit(1);
    }
}



function initServer()
{
    ensureHasAccessToken()
    .then(function(resAccessToken)
    {
        app.post(PATH_POST, function(req, res)
        {
            console.log('<>Rx:'); // OUT: Rx
            console.log(req.body);
            
            // Checks if keywords were given and proceeds accordingly
            if (req.body.keyword == undefined)
            {
                return res.json(getResponseJSON(false, "No keyword(s) specified"));
            }

            // Fetches Twitter data as a JSON object
            fetchTwitter(req.body.keyword)
            .catch(function(e)
            {
                throw new Error("Fetch from twitter failed");
            })
            // Parses JSON data for processing by machine learning libraries
            .then(function(jsonData)
            {
                if (jsonData.errors != undefined || jsonData.statuses == undefined)
                {
                    return Promise.reject(jsonData.errors);
                }
                
                // /* Debug: Print Full Twitter Output
                // console.log(jsonData);
                // */
                
                let twitterData = jsonData.statuses.map(function(tweet)
                {
                    return {
                        "name": tweet.user.name,
                        "text": tweet.text,
                        "retweet_count": tweet.retweet_count
                    };
                });
                
                // Processes the parsed tweets into output data using BlueMix library
                return bmModule.analyze(twitterData);
            })
            // Processes the previously processed tweets using Lexalytics library
            .then(function(input)
            {
                return Promise.all(input.map(v => saModule.analyze(v)));
            })
            // Processes the previously processed tweets using Gender API library
            .then(function(input)
            {
                return Promise.all(input.map(v =>  gaModule.analyze(v)));
            })
            // Sends reponse to client
            .then(function(response)
            {
                if (verbose) // OUT: Tx
                {
                    console.log('<>Tx:')
                    console.log(response);
                }
                
                res.json(getResponseJSON(true, response));
            })
            .catch(function (e)
            {
                if (e != undefined)
                {
                    res.json(getResponseJSON(false, e));
                }
                
                console.log(e);
            });
        });
    })
    .catch(function (e)
    {
        console.log('<>ER:'); // OUT: ER
        console.log(e);
    });
}



function getResponseJSON(success, body)
{
    return {
        "success": success,
        "body": body
    };
}

function fetchTwitter(keywords)
{
    return fetch(getURL(keywords),
        {
            headers: {
                'authorization': 'Bearer ' + accessToken
            }
        })
    .then(function(res)
    {
        return res.json()
    })
    .then(function(jsonData)
    {
        if (verbose) // OUT: Dt
        {
            console.log('<>Dt:');
            console.log(jsonData);
        }
        
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
    return 'https://api.twitter.com/1.1/search/tweets.json?result_type=mixed&lang=en&count=' + NUM_TWEETS + '&q=' + encodeURI(keywords);
}

function ensureHasAccessToken()
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

function regenerateAccessToken()
{
    return
    getAccessToken()
    .then(function(token)
    {
        fetch('https://api.twitter.com/oauth2/invalidate_token',
            {
                method: 'POST',
                body: 'access_token=' + token,
                headers: {
                    'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
                }
            })
    })
    .then(function(res)
    {
        return getAccessToken();
    })
}

function getAccessToken()
{
    if (key.consumerKey == undefined || key.consumerSecret == undefined)
        return Promise.reject('Malformed key file');
    
    let encodedKey = new Buffer(key.consumerKey + ":" + key.consumerSecret).toString('base64');
    
    return fetch('https://api.twitter.com/oauth2/token',
        {
            method: 'POST',
            body: 'grant_type=client_credentials',
            headers: {
                'authorization': 'Basic ' + encodedKey,
                'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        })
    .then(function(res)
    {
        return res.json();
    })
    .then(function(data)
    {
        accessToken = data.access_token;
        
        key = {
            'consumerKey': key.consumerKey,
            'consumerSecret': key.consumerSecret,
            'accessToken': accessToken
        };
        
        fs.writeFile('key.json', JSON.stringify(key), 'utf8', function(e) {});
        
        return data;
    })
    .catch(function(e)
    {
        console.log("<>EA: "); // OUT: EA
        console.log(e);
        
        return Promise.reject('Error while generating access token');
    });
    
}

