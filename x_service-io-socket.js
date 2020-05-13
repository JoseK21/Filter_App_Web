var app = require('express');
var server = require('http').Server(app);
var io = require('socket.io')(server);
const fs = require('fs');

server.listen(3000, () => { console.log('Socket.io server is listening on port 3000'); })

io.on('connection', function (socket) { console.log('A user connected'); socket.emit('test event', 'Connected') })

io.sockets.on('connection', function (socket) {
    socket.on('my other event', function (data) {
        /* console.log(data); */
        try {

            fs.writeFile("test", data, function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
            }); 

        } catch (error) {
            console.log(error)
        }
    });
});


