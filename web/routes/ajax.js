var express = require('express');
var router = express.Router();
var path = require('path');
var run_cmd = require('../util/run_cmd.js');
var cache_data = require("../util/cache_data.js");
var process_data = require("../util/process_data.js");
var urllib = require('url');
/**
 * Request Handler on "/search?title=&text=&startdate=&enddate=&page=1&itemNum="
 * parameter
 * * text : string [title box value]
 * * title : string [text box value]
 * * startdata : number [data range box value parsed]
 * * enddate : number [data range box value parsed]
 * * page : number [default = 1]
 * * itemNum = number [default = 50, inter code modifiable ]
 */
router.get('/search', function (req, res, next) {
    var para = urllib.parse(req.url, true);
    var title = para.query.title;
    var text = para.query.text;
    var startdate = para.query.startdate;
    var enddate = para.query.enddate;
    var page = para.query.page||1;
    var itemNumInPage = para.query.itemNum || 100;
    var requestParameter = {};
    requestParameter.title = title;
    requestParameter.text = text;
    requestParameter.startdate = startdate;
    requestParameter.enddate = enddate;
    var queryDataResult = undefined;

    //Check if the data has been cached first.
    fileExist = cache_data.dataFileIsExist(requestParameter);
    if (fileExist.status == true) {
        //If data was cached, read the data file and rend data to front-end
        console.log("fetch data from cache");
        fetchData = cache_data.fetch_data(requestParameter);
        var resSendData = process_data.fetchDataByPage(JSON.parse(fetchData.data), page, itemNumInPage);
        res.send(resSendData);
    } else {
        //If data was not cached, call run_cmd.exec to hang up child process and execute python script to get bigquery data.
        var errorMsg = "";
        var queryDataResult = 
        console.log("fetch data from bigquery")
        requestParameterString = JSON.stringify(requestParameter);
        var python_env_path = '';
        if (process.platform == 'win32') {
            // python virtualenv path for windows 10
            python_env_path = path.join(__dirname, '../../service/hackernewsstories/Scripts/python');
        } else {
             // python virtualenv path for Ubuntu
            python_env_path = path.join(__dirname, '../../service/hackernewsstoriesUbuntu/bin/python3.6');
        }
        console.log(requestParameterString);
        
        //hang up python child process
        run_cmd.exec(python_env_path, [path.join(__dirname, '../../service/search-engine/fetch-bigquery-result.py'), requestParameterString],
            function (data) {
                queryDataResult = data;
                console.log('queryDataResult');
                console.log(queryDataResult);
            },
            function(err){
                console.log('error');
                console.error(err);
                queryDataResult = "";
                errorMsg = err;
            }
        );
        // cached data first and then rend data to front-end
        if(queryDataResult != ""){
            var cacheData = cache_data.cache_data(requestParameter, queryDataResult, function (data) {
                console.log('after cached data:' + data);
                var resSendData = process_data.fetchDataByPage(data, page, itemNumInPage);
                res.send(resSendData);
            });
        }else{
            res.status(500).send(errorMsg);
        }        
    }
});

module.exports = router;