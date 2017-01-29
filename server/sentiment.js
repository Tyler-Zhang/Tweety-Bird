var watson = require('watson-developer-cloud');
var alchemy_language = watson.alchemy_language({
  api_key:  "01e79e4c7beaafc0d26bfe16186721d9ffabde9d"
})

var parameters = {
  extract: 'doc-sentiment',
  sentiment: 1,
  text: "I love loving! Love all the babies, yeah"

alchemy_language.combined(parameters, function (err, response) {
  if (err)
    console.log('error:', err);
  else
    console.log(JSON.stringify(response, null, 2));
});