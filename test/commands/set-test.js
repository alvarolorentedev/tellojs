
jest.mock('../../src/exchanger', () => ({
    send: jest.fn()
}))

const commander = require('../../src/exchanger'),
    setCommands = require('../../src/commands/set'),
    { faker } = require('@faker-js/faker')

describe('set commandsfor speed', () => {

    it('should have command for set speed', () => {
        const value = faker.datatype.number(100)
        setCommands.speed(value)
        expect(commander.send).toBeCalledWith(`speed ${value}`)
    })

    it('should have command for set rc', () => {
        const x = faker.datatype.number(100)
        const y = faker.datatype.number(100)
        const z = faker.datatype.number(100)
        const yaw = faker.datatype.number(100)
        setCommands.rc(x, y, z, yaw)
        expect(commander.send).toBeCalledWith(`rc ${x} ${y} ${z} ${yaw}`)
    })

    it('should have command for set wifi', () => {
        const ssid = faker.datatype.uuid()
        const password = faker.datatype.uuid()
        setCommands.wifi(ssid, password)
        expect(commander.send).toBeCalledWith(`wifi ${ssid} ${password}`)
    })
})