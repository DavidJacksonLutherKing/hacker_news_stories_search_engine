/*
usage: run_cmd( "netstat", ["-an"], function(text) { res.send(text); });
 run_cmd('python',["path/to/script.py", arg1, arg2, ...]);
*/

module.exports = {
    exec: function (cmd, args,cb_stdout,cb_end) {
        try{
            const spawn = require('child_process').spawn;
            const child = spawn(cmd, args);
            me =this;
            me.exit = 0;
            me.stdout = "";
            
            child.stdout.on('data', (data) => {
                cb_stdout(data, me);
            });
            
            child.stderr.on('data', (data) => {
                console.log(data.toString());
            });
            
            child.on('close', (code) => {
              console.log('subprocess exit code:', code);
              cb_end(me);
            });
        }catch (error){
            console.log(error.toString(0));
        }
    }
};
