const dgram = require('dgram'),
    client = dgram.createSocket('udp4'),
    constants = require('./constants.json')

const send = async (command) => {
    const message = Buffer.from(command)
    return await new Promise((resolve, reject) => client.send(message, 0, message.length, constants.ports.command, constants.hosts.remote, (error, result) => {
        if(error)
            reject(error)
        else
            resolve(result)
    }))
}

module.exports = { send }