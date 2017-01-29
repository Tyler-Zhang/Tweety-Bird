var fetch = require('node-fetch');

function analyze(twitter)
{
    /*
    return fetch("https://www.gender-api.com/get?name=" + encodeURIComponent(twitter.name.split(" ")[0]) + "&key=SajkAoWsorDFguoFTa")
    .then(function(info) {
        return info.json();
    })
    .then(g => {
        return Object.assign({}, twitter, {gender: g.gender});
    });
    // */

    if (Math.random() < 0.5)
        return Object.assign({}, twitter, {gender: "male"});
    else
        return Object.assign({}, twitter, {gender: "female"});
    // */
}

module.exports = {analyze};

