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

function analyze(keywords){
    return base("/analyze", {keywords});
}