var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var yelp = require("yelp").createClient({
        consumer_key: "kQkIdv9NXoKRC3cv7lYbCg",
        consumer_secret: "ZBm5d2C19pRE3UbET6XlJnW1U2g",
        token: "kbLUg3MSgmxDtYczhcPVos_jXJW687_3",
        token_secret: "n2-QgTBPFYjk42x71nDEz-XAMvw"
    });

// See http://www.yelp.com/developers/documentation/v2/search_api
    var options = {};
    for(var element in req.query){
        options[element] = req.query[element];
    }
    yelp.search(options,function(error, data) {
        if(data) {
            res.send(data);
        } else {
            res.send(error);
        }
    });
});

module.exports = router;
