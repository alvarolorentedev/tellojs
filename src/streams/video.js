const dgram = require('dgram'),
    client = dgram.createSocket('udp4'),
    constants = require('../constants.json'),
    EventEmitter = require('events'),
    _local = {
        emitter: undefined
    }

client.on('message', message => _local.emitter.emit('message', message.slice(2)))

const bind = () => {
    client.bind(constants.ports.video)
    _local.emitter = new EventEmitter()
    return _local.emitter
}

const close = () => client.close()

module.exports = { bind, close }