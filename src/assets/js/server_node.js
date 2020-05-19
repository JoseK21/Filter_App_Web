function call_server_example(data) {

    const { exec } = require("child_process");
    const { execFile } = require('child_process');

    execFile('./client', [data.name, data.url, data.port], (error, stdout, stderr) => {
        if (error) { console.log(error) }
        console.log(stdout);
    });
}

function initial_server_node() {
    var app = require('express');
    var server = require('http').Server(app);
    var io = require('socket.io')(server);
    const fs = require('fs');

    server.listen(3000, () => { console.log('\nServer Running...\n'); })

    io.on('connection', function (socket) { socket.emit('test event', 'Connected') })

    io.sockets.on('connection', function (socket) {
        socket.on('my other event', function (data) {
            try {
                fs.writeFile(data.name, data.image, function (err) {
                    if (err) { return console.log(err); }
                    call_server_example(data)
                    console.log("The file was saved!");
                });

            } catch (error) { console.log(error) }
        });
    });
}