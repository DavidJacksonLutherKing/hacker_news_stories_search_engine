module.exports = {
    exec: function (cmd, args, cb_stdout) {
        try {
            const spawn = require('child_process').spawnSync;
            const child = spawn(cmd, args);            
            cb_stdout(child.stdout);
        } catch (error) {
            console.log(error.toString(0));
        }
    }
};