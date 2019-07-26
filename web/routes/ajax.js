var express = require('express');
var router = express.Router();
var path = require('path');
var run_cmd = require('../util/run_cmd.js');

var urllib = require('url');
router.get('/search', function (req, res, next) {
    // res.send("received request");
    var para = urllib.parse(req.url, true);
    var title = para.query.title;
    var text = para.query.text;
    var startdate =para.query.startdate;
    var enddate =para.query.enddate;
    var requestParameter = {};
    requestParameter.title = title;
    requestParameter.text = text;
    requestParameter.startdate = startdate;
    requestParameter.enddate = enddate;
    requestParameterString= JSON.stringify(requestParameter);    
    var python_env_path = '';
    if (process.platform == 'win32') {
      python_env_path = path.join(__dirname, '../../service/hackernewsstories/Scripts/python')
    } else {
      python_env_path = path.join(__dirname, '../../service/hackernewsstoriesUbuntu/bin/python3.6')
    }
    console.log(requestParameterString);
    run_cmd.exec(python_env_path,[ path.join(__dirname,'../../service/search-engine/fetch-bigquery-result.py'),requestParameterString],
        function(data){
            res.send(data.toString());
        }
    );
});

module.exports = router;
