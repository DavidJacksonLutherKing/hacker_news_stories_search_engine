module.exports = {
    exec: function (cmd, args, cb_stdout,cd_error) {
        try {
            const spawn = require('child_process').spawnSync;
            const child = spawn(cmd, args);     
            if('articles'in JSON.parse(child.stdout) ){
                cb_stdout(child.stdout);
            } else{
                cd_error(child.stdout);
            }               
        } catch (error) {
            cd_error(error.toString());
        }
    }
};