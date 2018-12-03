const commander = require('../exchanger')

const speed = () => commander.send('speed?')

const battery = () => commander.send('battery?')

const time = () => commander.send('time?')

const wifi = () => commander.send('wifi?')

const sdk = () => commander.send('sdk?')

const serial = () => commander.send('sn?')

module.exports = { speed, battery, time, wifi, sdk, serial }