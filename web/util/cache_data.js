/** 
 * Module: Cache Data
 * This module is to cache frequently used data.
 **/
module.exports = {
    dataFileIsExist: function (queryBody) {
        var fs = require('fs');
        var path = require('path');
        var title = queryBody.title == "" ? "null" : queryBody.title;
        title = title.split(" ").join("_");
        var text = queryBody.text == "" ? "null" : queryBody.text;
        text = text.split(" ").join("_");
        var startdate = queryBody.startdate;
        var enddate = queryBody.enddate;
        var file_name = ['search', title, text, startdate, enddate, "temp", "datafile"].join("-") + '.json';
        var file_path = path.join(__dirname, "../cache_data_folder/" + file_name);
        console.log(file_path);
        me = {};
        me.file_path = file_path;
        me.message = "";
        me.status = new Boolean();
        console.log('start to check data from cached file');
        try {
            fs.accessSync(file_path, fs.constants.F_OK | fs.constants.W_OK);
            console.error(me.message);
            me.message = 'Access to ' + file_name;
            me.status = true;
        } catch (e) {
            me.message = "No file " + file_name;
            me.status = false;
            console.error(e);
        }
        return me;
    },
    cache_data: function (queryBody, data, callback) {
        var fs = require('fs');
        var path = require('path');
        var title = queryBody.title == "" ? "null" : queryBody.title;
        title = title.split(" ").join("_");
        var text = queryBody.text == "" ? "null" : queryBody.text;
        text = text.split(" ").join("_");
        var startdate = queryBody.startdate;
        var enddate = queryBody.enddate;
        var file_name = ['search', title, text, startdate, enddate, "temp", "datafile"].join("-") + '.json';
        var file_path = path.join(__dirname, "../cache_data_folder/" + file_name);
        me = {};
        me.file_path = file_path;
        me.message = "";
        me.data = data;
        console.log('cached data:');
        console.log(data);
        console.log('start to cache data');
        var directoryPath = path.join(__dirname, "../cache_data_folder/");
        if(!fs.existsSync(directoryPath)){
            fs.mkdirSync(path.join(__dirname, "../cache_data_folder/"), function (mkdirErr) {
                if (mkdirErr) {
                    console.error(mkdirErr);
                }
            });
        }        
        fs.writeFileSync(file_path,data, function (writeErr) {
            console.log('start to write data');
            if (writeErr) {
                console.error(writeErr);
            } else {
                me.message = file_name + ' created successfully';
                console.log(me.message);
            }
        });
        callback(me.data);
        return me;
    },
    fetch_data: function (queryBody) {
        var fs = require('fs');
        var path = require('path');
        var title = queryBody.title == "" ? "null" : queryBody.title;
        title = title.split(" ").join("_");
        var text = queryBody.text == "" ? "null" : queryBody.text;
        text = text.split(" ").join("_");
        var startdate = queryBody.startdate;
        var enddate = queryBody.enddate;
        var file_name = ['search', title, text, startdate, enddate, "temp", "datafile"].join("-") + '.json';
        var file_path = path.join(__dirname, "../cache_data_folder/" + file_name);
        me = {};
        me.file_path = file_path;
        me.message = "";
        me.data = fs.readFileSync(file_path);
        return me;
    }
}