import fetch from 'whatwg-fetch';

function base(url, body){
    return fetch(url, {
        method: "POST",
        body,
        headers:{
            "content-type": "application/json"
        }
    }).then(d => d.json())
    .catch(e => {
        console.error(e);
        return {
            success: false,
            body: e
        }
    })
    .then(d => {
        if(d.success == false)
            throw(d.body);
        else
            return d.body;
    })
}


export function analyze(keywords){
    return base("/analyze", {keywords});
}

export function testAnalyze(){
    return new Promise((resolve) => {
        resolve([
            {tweet: "Yo I'm an idiot", name:"dayshun", gender: "male", retweets: 100, level: 0.6, tone: {joy: 0.3, sadness: 0.1, fear: 0.6, disgust: 0.7, anger: 0.3}},

            {tweet: "Hey", name:"dayshun", gender: "female", retweets: 200, level: 0.4, tone: {joy: 0.7, sadness: 0.1, fear: 0.3, disgust: 0.2, anger: 0.3}},

            {tweet: "What's up?", name:"dayshun", gender: "male", retweets: 100, level: 0.5, tone: {joy: 0.1, sadness: 0.4, fear: 0.2, disgust: 0.7, anger: 0.9}},

            {tweet: "LEAVE!", name:"dayshun", gender: "female", retweets: 50, level: 0.6, tone: {joy: 0.3, sadness: 0.1, fear: 0.6, disgust: 0.7, anger: 0.3}},

            {tweet: "Really happy", name:"dayshun", gender: "male", retweets: 10, level: 0.8, tone: {joy: 0.9, sadness: 0.1, fear: 0.0, disgust: 0.0, anger: 0.0}},

            {tweet: "Really sad", name:"dayshun", gender: "female", retweets: 0, level: 0.3, tone: {joy: 0.0, sadness: 1.0, fear: 0.1, disgust: 0.1, anger: 0.1}},

            {tweet: "Really angry", name:"dayshun", gender: "male", retweets: 40, level: 0.9, tone: {joy: 0.1, sadness: 0.1, fear: 0.1, disgust: 0.1, anger: 0.9}},

            {tweet: "Really Disgusted", name:"dayshun", gender: "female", retweets: 300, level: 0.6, tone: {joy: 0.1, sadness: 0.1, fear: 0.1, disgust: 1.0, anger: 0.2}},

            {tweet: "Really scared", name:"dayshun", gender: "male", retweets: 1000, level: 0.1, tone: {joy: 0.1, sadness: 0.3, fear: 1.0, disgust: 0.2, anger: 0.0}},

            {tweet: "A little bit of everything", name:"dayshun", gender: "female", retweets: 65, level: 1.0, tone: {joy: 0.5, sadness: 0.5, fear: 0.5, disgust: 0.5, anger: 0.5}}
            ])
    })
}