var fetch = require('node-fetch');
var name = "elizabeth"

fetch("https://www.gender-api.com/get?name=" + name + "&key=SajkAoWsorDFguoFTa")
    .then(function(info) {
        return info.json();
    }).then(function(name) {
        console.log(name);
});
