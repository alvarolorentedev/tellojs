const dgram = require('dgram'),
    client = dgram.createSocket('udp4'),
    constants = require('../constants.json'),
    commander = require('../exchanger')
    EventEmitter = require('events'),
    _local = {
        emitter: undefined
    }

client.on('message', message => _local.emitter.emit('message', message))

const bind = async () => {
    try {
        await commander.send('streamon')
    } catch (_) {
        throw "Unable to start video stream"
    }
    client.bind(constants.ports.video)
    _local.emitter = new EventEmitter()
    return _local.emitter
}

const close = async () => {
    try {  
        await commander.send('streamoff')
    } catch (error) {
        throw "Unable to stop video stream"
    }
    client.close()
}

module.exports = { bind, close }