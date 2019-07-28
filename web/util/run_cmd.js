module.exports = {
    exec: function (cmd, args, cb_stdout) {
        try {
            const spawn = require('child_process').spawnSync;
            const child = spawn(cmd, args);
            // me = this;
            // me.exit = 0;
            // me.stdout = "";
            cb_stdout(child.stdout);
            // child.stdout.on('data', (data) => {
            //     cb_stdout(data, me);
            // });

            // child.stderr.on('data', (data) => {
            //     console.log(data.toString());
            // });

            // child.on('close', (code) => {
            //     cb_end(me);
            //     console.log('childprocess exit code:', code);
            // });
        } catch (error) {
            console.log(error.toString(0));
        }
    }
};