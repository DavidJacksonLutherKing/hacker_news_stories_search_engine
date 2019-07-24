/*
usage: run_cmd( "netstat", ["-an"], function(text) { res.send(text); });
 run_cmd('python',["path/to/script.py", arg1, arg2, ...]);
*/

module.exports = {
    exec: function (cmd, args,cb_stdout) {
        const { spawn } = require('child_process');
        const child = spawn(cmd, args);
        
        child.stdout.on('data', (data) => {
            cb_stdout(data);
        });
        
        child.stderr.on('data', (data) => {
            console.log(data.toString());
        });
        
        child.on('close', (code) => {
          console.log('subprocess exit code:', code);
        });
    }
};
