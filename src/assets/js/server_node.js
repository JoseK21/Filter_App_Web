

/* server.listen(3000, () => { console.log('\nServer Running...\n'); })

io.on('connection', function (socket) { socket.emit('test event', 'Connected') })

io.sockets.on('connection', function (socket) {
    socket.on('my other event', function (data) {
        try {
            fs.writeFile(data.name, data.image, function (err) {
                if (err) { return console.log(err); }
                call_server_example(data.name)
                console.log("The file was saved!");
            });

        } catch (error) { console.log(error) }
    });
}); */

/* FUNCIONAL ÚLTIMA LLAMADA */
/* function call_server_example(size, data) {
    exec('./client', (error, stdout, stderr) => {
        if (error) { console.log(error) }
        console.log(stdout);
    });
} */


function call_server_example(name) {

    const { exec } = require("child_process");
    const { execFile } = require('child_process');

    execFile('./client', [name], (error, stdout, stderr) => {
        if (error) { console.log(error) }
        console.log(stdout);
    });
}
/* node x_service-io-socket.js */


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
                    call_server_example(data.name)
                    console.log("The file was saved!");
                });

            } catch (error) { console.log(error) }
        });
    });
}