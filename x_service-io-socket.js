var app = require('express');
var server = require('http').Server(app);
var io = require('socket.io')(server);

io.on('connection', function (socket) {
    console.log('A user connected');
    socket.emit('test event', 'here is some data')
})

io.sockets.on('connection', function (socket) {
    socket.on('my other event', function (data) {
        //console.log(data[0]);
        let a = []
        for (var key in data[0]) {
            a.push(data[0][key])
        }
        console.log(a);
    });
});


server.listen(3000, () => {
    console.log('Socket.io server is listening on port 3000');
})