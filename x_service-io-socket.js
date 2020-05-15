var app = require('express');
var server = require('http').Server(app);
var io = require('socket.io')(server);
const fs = require('fs');

/* Call C Function */
const { exec } = require("child_process");
const { execFile } = require('child_process');

server.listen(3000, () => { console.log('\nServer Running...\n'); })

io.on('connection', function (socket) { socket.emit('test event', 'Connected') })

io.sockets.on('connection', function (socket) {
    socket.on('my other event', function (data) {
        try {
            fs.writeFile("my_image.jpg", data.image, function (err) {
                if (err) { return console.log(err); }
                call_server_example(data.size, "my_image.jpg")
                console.log("The file was saved!");
            });

        } catch (error) { console.log(error) }
    });
});

function call_server_example(size, data) {
    execFile('./myProgram', [size, data], (error, stdout, stderr) => {
        if (error) { console.log(error) }
        console.log(stdout);
    });
}

/* node x_service-io-socket.js */