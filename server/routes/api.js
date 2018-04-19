var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');

/* GET home page. */
router.get('/', function(req, res, next) {
  let baseUrl = "https://od-api.oxforddictionaries.com/api/v1/wordlist/en/domains%3D"
  // let url = "https://od-api.oxforddictionaries.com/api/v1/wordlist/en/domains%3DArt"
  let url = baseUrl + req.query.search
  console.log(url)
  fetch(url,
    {
      headers: {
        'Content-Type': 'application/json',
        'app_id': process.env.OXFORD_APP_ID,
        'app_key': process.env.OXFORD_APP_KEY
      }
    })
    .then(res => res.json())
    .then(json => res.json(json))
    .catch(err => {
      console.log(err)
      res.json({error: "Unable to fetch words, please try a different word"})
    })
});

module.exports = router;
