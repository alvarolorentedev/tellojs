const dgram = require('dgram'),
    client = dgram.createSocket('udp4'),
    constants = require('./constants.json'),
    {promisify} = require('util'),
    sendOnSocket = promisify(client.send)

const send = async (command) => {
    const message = new Buffer(command)
    return await sendOnSocket(message, 0, message.length, constants.ports.command, constants.hosts.remote)
}

module.exports = { send }