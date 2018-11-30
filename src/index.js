const constants = require('./constants'),
    dgram = require('dgram'),
    serverImages = dgram.createSocket('udp4'),
    commander = require('./exchanger')

const connect = () => {
    commander.send('command').catch(console.error).then(console.log)
}
const takeoff = () => {
    commander.send('takeoff').catch(console.error).then(console.log)
}

const land = () => {
    commander.send('land').catch(console.error).then(console.log)
}

const videoOn = () => {
    var message = new Buffer('streamon')
    client.send(message, 0, message.length, constants.ports.command, constants.host, function(err, bytes) {
		if (err) throw err
    })
    
    serverImages.on('listening', function () {
        var address = server.address();
        console.log('UDP Server listening on ' + address.address + ":" + address.port);
    });
    
    serverImages.on('message', function (message, remote) {
        console.log(remote.address + ':' + remote.port +' - ' + message);
    
    });
    
    serverImages.bind(constants.ports.video, '0.0.0.0');
}

const videoOff = () => {
    serverImages.close(constants.ports.video, '0.0.0.0');
    commander.send('streamoff')
}

module.exports = { connect, takeoff, land, videoOn, videoOff }