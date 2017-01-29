var fetch = require('node-fetch');

function analyze(name)
{
    return fetch("https://www.gender-api.com/get?name=" + name + "&key=SajkAoWsorDFguoFTa")
    .then(function(info) {
        return info.json();
    })
    .then(g =>  g.gender);
    
    /*
    if (Math.random() < 0.5)
        return 'male';
    else
        return 'female';
    // */
}

module.exports = {analyze};

