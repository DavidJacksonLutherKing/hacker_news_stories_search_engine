var express = require('express');
var router = express.Router();
var path = require('path');
var run_cmd = require('../util/run_cmd.js');
var cache_data = require("../util/cache_data.js");
var urllib = require('url');
router.get('/search', function (req, res, next) {
    var para = urllib.parse(req.url, true);
    var title = para.query.title;
    var text = para.query.text;
    var startdate = para.query.startdate;
    var enddate = para.query.enddate;
    var requestParameter = {};
    requestParameter.title = title;
    requestParameter.text = text;
    requestParameter.startdate = startdate;
    requestParameter.enddate = enddate;
    var queryDataResult = undefined;

    fileExist = cache_data.dataFileIsExist(requestParameter);
    if (fileExist.status == true) {
        console.log("fetch data from cache");
        fetchData = cache_data.fetch_data(requestParameter);
        res.send(fetchData.data);
    } else {
        console.log("fetch data from bigquery")
        requestParameterString = JSON.stringify(requestParameter);
        var python_env_path = '';
        if (process.platform == 'win32') {
            python_env_path = path.join(__dirname, '../../service/hackernewsstories/Scripts/python');
        } else {
            python_env_path = path.join(__dirname, '../../service/hackernewsstoriesUbuntu/bin/python3.6');
        }
        console.log(requestParameterString);
        run_cmd.exec(python_env_path, [path.join(__dirname, '../../service/search-engine/fetch-bigquery-result.py'), requestParameterString],
            function (data) {
                queryDataResult = data;
                console.log(queryDataResult);
            }
            // function (me) {
            //     me.exit = 1;
            //     console.log(me.stdout);
            //     queryDataResult = me.stdout;                
            // }
        );
        var cacheData = cache_data.cache_data(requestParameter, queryDataResult, function (data) {
            console.log('after cached data:' + data);
            res.send(data);
        });
    }
});

module.exports = router;