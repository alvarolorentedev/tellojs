
jest.mock('../../src/exchanger', () => ({
    send: jest.fn()
}))

const commander = require('../../src/exchanger'),
    setCommands = require('../../src/commands/set'),
    faker = require('faker')

describe('set commandsfor speed', () => {

    it('should have command for set speed', () => {
        const value = faker.random.number(100)
        setCommands.speed(value)
        expect(commander.send).toBeCalledWith(`speed ${value}`)
    })

    it('should have command for set rc', () => {
        const x = faker.random.number(100)
        const y = faker.random.number(100)
        const z = faker.random.number(100)
        const yaw = faker.random.number(100)
        setCommands.rc(x, y, z, yaw)
        expect(commander.send).toBeCalledWith(`rc ${x} ${y} ${z} ${yaw}`)
    })

    it('should have command for set wifi', () => {
        const ssid = faker.random.uuid()
        const password = faker.random.uuid()
        setCommands.wifi(ssid, password)
        expect(commander.send).toBeCalledWith(`wifi ${ssid} ${password}`)
    })
})