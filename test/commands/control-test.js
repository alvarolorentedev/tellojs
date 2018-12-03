jest.mock('../../src/exchanger', () => ({
    send: jest.fn()
}))

const commander = require('../../src/exchanger'),
    controlCommands = require('../../src/commands/control')
    faker = require('faker')

describe('control commands', () => {
    it('should have command for enter command mode', () => {
        controlCommands.connect()
        expect(commander.send).toBeCalledWith('command')
    })

    it('should have command for takeoff', () => {
        controlCommands.takeoff()
        expect(commander.send).toBeCalledWith('takeoff')
    })

    it('should have command for land', () => {
        controlCommands.land()
        expect(commander.send).toBeCalledWith('land')
    })

})