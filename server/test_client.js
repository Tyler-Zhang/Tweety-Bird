
let fetch = require('node-fetch');

function sendPost(postBody) {
    
    let body = JSON.stringify(postBody);
    
    fetch('http://localhost:9001/getData',
        { method: 'POST', body, headers: {'content-type': 'application/json'}})
    .then(function(res)
    {
        return res.json()
    })
    .then(function(data)
    {
        console.log("<>Dt:"); // TEST: Dt
        console.log(data);
    })
    .catch(function(e)
    {
        console.log("<>ER:"); // TEST: ER
        console.log(e);
    });
    
    console.log('<>PO:'); // TEST: PO
    console.log(postBody);
    
}

function sendTestPost(keyword) {
    
    sendPost({keyword});
}

module.exports = {sendPost, sendTestPost};

