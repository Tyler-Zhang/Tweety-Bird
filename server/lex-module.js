var fetch = require('node-fetch');
var text = "This is a test string that loves its mommy very much."

fetch('https://api.semantria.com/document.json', { method: 'POST', body: {"text": text }});
var answer = fetch('https://api.semantria.com/document/processed.json');
console.log(answer);

