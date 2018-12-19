const dgram = require('dgram'),
    client = dgram.createSocket('udp4'),
    constants = require('../constants.json'),
    EventEmitter = require('events'),
    _local = {
        emitter: undefined
    }
    
const format = (mapped) => ({
    pitch: mapped.pitch, 
    roll: mapped.roll, 
    yaw: mapped.yaw,
    speed: { x: mapped.vgx, y: mapped.vgy, z: mapped.vgz },
    temperature: { low: mapped.templ, high: mapped.temph },
    tof: mapped.tof,
    heigh: mapped.h,
    battery: mapped.bat,
    barometer: mapped.baro,
    time: mapped.time,
    acceleration: { x: mapped.agx, y: mapped.agy, z: mapped.agz}
})

const map = (message) => {
    let mapped = message.toString()
        .slice(0, -1)
        .split(';')
        .map(element => element.split(':'))
        .reduce((acc, [key, value]) => {
            acc[key] = Number(value)
            return acc
        }, {})

    return format(mapped)
}    
client.on('message', message => _local.emitter.emit('message', map(message)))

const bind = () => {
    client.bind(constants.ports.state)
    _local.emitter = new EventEmitter()
    return _local.emitter
}

const close = () => client.close()

module.exports = { bind, close }