var fetch = require('node-fetch');

function analyze(twitter)
{
    return fetch("https://www.gender-api.com/get?name=" + twitter.name + "&key=SajkAoWsorDFguoFTa")
    .then(function(info) {
        return info.json();
    })
    .then(g => {
        return Object.assign({}, twitter, g.gender);
    });
    
    /*
    if (Math.random() < 0.5)
        return 'male';
    else
        return 'female';
    // */
}

module.exports = {analyze};

