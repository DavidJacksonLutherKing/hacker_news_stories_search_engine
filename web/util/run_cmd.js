module.exports = {
    /**
     * Method : Execute (command, arguments, output_callback, erro_callback)
     * hang up child process to execute python script
     */
    exec: function (cmd, args, cb_stdout,cd_error) {
        try {
            const spawn = require('child_process').spawnSync;
            const child = spawn(cmd, args);  
            try{
                cb_stdout(JSON.parse(child.stdout));
            } catch(e){
                console.error(e);
                cd_error(child.stdout);
            }
        } catch (error) {
            cd_error(error.toString());
        }
    }
};