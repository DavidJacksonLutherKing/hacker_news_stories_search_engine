/** 
 * Module: Cache Data
 * This module is to cache frequently used data.
 **/
module.exports = {
    /**
     * Method : check data file existence (query variables)
     */
    dataFileIsExist: function (queryBody) {
        var fs = require('fs');
        var path = require('path');

        // compose file path
        var title = queryBody.title == "" ? "null" : queryBody.title;
        title = title.split(" ").join("_");
        var text = queryBody.text == "" ? "null" : queryBody.text;
        text = text.split(" ").join("_");
        var startdate = queryBody.startdate;
        var enddate = queryBody.enddate;
        var file_name = ['search', title, text, startdate, enddate, "temp", "datafile"].join("-") + '.json';
        var file_path = path.join(__dirname, "../cache_data_folder/" + file_name);
        console.log(file_path);

        // compose return object me
        me = {};
        me.file_path = file_path;
        me.message = "";
        me.status = new Boolean();
        console.log('start to check data from cached file');
        // check if the file exists in the system path and return boolean.
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

    /**
     *  Method : Cache Data (query variables, search result data, callback function)
     */
    cache_data: function (queryBody, data, callback) {
        var fs = require('fs');
        var path = require('path');

        // compose file path
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
        // Check if the directory exists in the path.
        var directoryPath = path.join(__dirname, "../cache_data_folder/");
        if(!fs.existsSync(directoryPath)){
            // If not, create the directory
            fs.mkdirSync(path.join(__dirname, "../cache_data_folder/"), function (mkdirErr) {
                if (mkdirErr) {
                    console.error(mkdirErr);
                }
            });
        }        
        // write to data to file
        fs.writeFileSync(file_path, JSON.stringify(me.data), function (writeErr) {
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

    /**
     *  Method : fetch Data (query variables)
     */
    fetch_data: function (queryBody) {
        var fs = require('fs');
        var path = require('path');
        // compose file path
        var title = queryBody.title == "" ? "null" : queryBody.title;
        title = title.split(" ").join("_");
        var text = queryBody.text == "" ? "null" : queryBody.text;
        text = text.split(" ").join("_");
        var startdate = queryBody.startdate;
        var enddate = queryBody.enddate;
        var file_name = ['search', title, text, startdate, enddate, "temp", "datafile"].join("-") + '.json';
        var file_path = path.join(__dirname, "../cache_data_folder/" + file_name);
        // fetch data from cached file and compose return object me.
        me = {};
        me.file_path = file_path;
        me.message = "";
        me.data = fs.readFileSync(file_path);
        return me;
    }
}