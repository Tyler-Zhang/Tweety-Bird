
const PATH_POST = '/post';
// const PATH_MOE = ''; // TODO

const NUM_TWEETS = 6;


const http = require('http');
const express = require('express');

const fetch = require('node-fetch');
const bodyParser = require('body-parser');

var fs = require("fs");

// const moe = require('moe'); // TODO


let app = express();
app.use(bodyParser.json());

let httpServer = http.createServer(app).listen(80);

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
    key = JSON.parse(fs.readFileSync("key.json"));
    
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
            else if (flag == '-o')
            {
                directOutput = true;
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
            if (req.body.keyword != undefined)
            {
                // Fetches Twitter data as a JSON object
                fetchTwitter(req.body.keyword)
                .catch(function(e)
                {
                    if (e != undefined)
                    {
                        res.json(getResponseJSON(false, "Could not fetch data"));
                    }
                    return Promise.reject();
                })
                // Parses JSON data for processing by machine learning library
                .then(function(jsonData)
                {
                    if (jsonData.errors != undefined || jsonData.statuses == undefined)
                    {
                        return Promise.reject(jsonData.errors);
                    }
                    
                    let arrStatuses = [];
                    jsonData.statuses.forEach(function(tweet, index)
                    {
                        arrStatuses[index] = {
                            "name": tweet.user.name,
                            "text": tweet.text,
                            "retweet_count": tweet.retweet_count
                        };
                    });
                    
                    return arrStatuses;
                })
                // Processes the parsed tweets into output data
                .then(function(processedTweets)
                {
                    if (directOutput)
                        return processedTweets;
                    
                    
                    
                    return processedTweets; // TODO: Call Moe's thing
                })
                // Formats ML output to response for front-end
                .then(function(output)
                {
                    if (directOutput)
                        return output;
                    
                    let response = output;
                    
                    
                    
                    
                    return response; // TODO: Format response for front-end
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
    console.log(getURL(keywords));
    
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
    return 'https://api.twitter.com/1.1/search/tweets.json?result_type=popular&count=' + NUM_TWEETS + '&q=' + encodeURI(keywords);
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

