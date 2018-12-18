const dgram = require('dgram'),
    client = dgram.createSocket('udp4'),
    constants = require('./constants.json'),
    _local = {
        state: "idle"
    }

client.on('message', (msg,info) => {
    _local.state = msg.toString()
}); 

client.bind(constants.ports.response)

const bindStateManagement = (resolve, reject) => {
    let timeoutId = setTimeout(() => {
        _local.state = "error"
    }, 10000);
    let intervalId = setInterval(() => {
        if(isIdle())
            return
        if(isError())
            reject(_local.state)
        else
            resolve(_local.state)
        clearInterval(intervalId)
        clearTimeout(timeoutId)
        _local.state = "idle"
    }, 100);
}

const isIdle = () => _local.state === "idle"
const isError = () => _local.state === "error"

const transmit = (command) => {
    const message = Buffer.from(command)
    client.send(message, 0, message.length, constants.ports.command, constants.hosts.remote, (error) => {
        if(error)
            _local.state = "error"
    })
}

const send = (command) => {
    return new Promise((resolve, reject) => {
        if(!isIdle())
            reject("error")
        bindStateManagement(resolve,reject)        
        transmit(command)
    })
}

module.exports = { send, _local }