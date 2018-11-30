const constants = require('./constants'),
    dgram = require('dgram'),
    commander = require('./exchanger'),
    binder = require('./stream-binder')

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
    commander.send('streamon')
    .then(() => binder.video.start())
    .then(console.log)
    .catch(console.error)
}

const videoOff = () => {
    commander.send('streamoff')
    .then(() => binder.video.stop())
    .then(console.log)
    .catch(console.error)
}

module.exports = { connect, takeoff, land, videoOn, videoOff }