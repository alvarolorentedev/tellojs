const constants = require('./constants'),
    dgram = require('dgram'),
    server = dgram.createSocket('udp4')

const videoStreamStart = () => new Promise((resolve, reject) => server.bind(constants.ports.video, constants.hosts.local, (error, result) => {
    if(error)
        reject(error)
    else
        resolve(result)
}))

const videoStreamStop = () => server.close()

module.exports = { 
    video: { start: videoStreamStart, stop: videoStreamStop } 
}