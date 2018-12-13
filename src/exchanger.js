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

const send = (command) => {
    return new Promise((resolve, reject) => {
        if(_local.state !== "idle")
            reject("error")
        const message = Buffer.from(command)
        client.send(message, 0, message.length, constants.ports.command, constants.hosts.remote, (error) => {
            if(error)
                _local.state = "error"
        })
        let timeoutId = setTimeout(() => {
            _local.state = "error"
        }, 10000);
        let intervalId = setInterval(() => {
            if(_local.state === "idle")
                return
            if(_local.state === "error")
                reject(_local.state)
            else
                resolve(_local.state)
            clearInterval(intervalId)
            clearTimeout(timeoutId)
            _local.state = "idle"
        }, 100);
        
    })
}

module.exports = { send, _local }