const commander = require('../exchanger')

const speed = () => commander.send('speed?')

const battery = () => commander.send('battery?')

const time = () => commander.send('time?')

const height = () => commander.send('height?')

const temperature = () => commander.send('temp?')

const attitude = () => commander.send('attitude?')

const barometer = () => commander.send('baro?')

const acceleration = () => commander.send('acceleration?')

const tof = () => commander.send('tof?')

const wifi = () => commander.send('wifi?')

module.exports = { speed, battery, time, wifi, height, temperature, attitude, barometer, tof, acceleration }