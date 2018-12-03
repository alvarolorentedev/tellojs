const commander = require('../exchanger')

const connect = () => commander.send('command')

const takeoff = () => commander.send('takeoff')

const land = () => commander.send('land')

const flip = (side) => commander.send(`flip ${side}`)

module.exports = { connect, takeoff, land, flip }