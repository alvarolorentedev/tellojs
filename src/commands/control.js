const commander = require('../exchanger')

const connect = () => commander.send('command')

const takeOff = () => commander.send('takeoff')

const land = () => commander.send('land')

const emergency = () => commander.send('emergency')

const stop = () => commander.send('stop')

const flip = (side) => commander.send(`flip ${side}`)

const up = (distance) => commander.send(`up ${distance}`)

const down = (distance) => commander.send(`down ${distance}`)

const left = (distance) => commander.send(`left ${distance}`)

const right = (distance) => commander.send(`right ${distance}`)

const front = (distance) => commander.send(`forward ${distance}`)

const back = (distance) => commander.send(`back ${distance}`)

const clockwise = (angle) => commander.send(`cw ${angle}`)

const counterClockwise = (angle) => commander.send(`ccw ${angle}`)

const go = (end,speed) => commander.send(`go ${end.x} ${end.y} ${end.z} ${speed}`)

const curve = (start, end,speed) => commander.send(`curve ${start.x} ${start.y} ${start.z} ${end.x} ${end.y} ${end.z} ${speed}`)

module.exports = { 
    connect, 
    takeOff, 
    land, 
    emergency,
    stop,
    go,
    curve,
    move: { up, down, left, right, back, front },
    rotate: { clockwise, counterClockwise },
    flip: {
        left: () => flip('l'),
        right: () => flip('r'),
        back: () => flip('b'),
        front: () => flip('f'),
    } 
}