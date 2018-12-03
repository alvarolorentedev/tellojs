jest.mock('../../src/exchanger', () => ({
    send: jest.fn()
}))

const commander = require('../../src/exchanger'),
    readCommands = require('../../src/commands/read')

describe('read commands', () => {
    it('should have command for speed check', () => {
        readCommands.speed()
        expect(commander.send).toBeCalledWith('speed?')
    })

    it('should have command for battery check', () => {
        readCommands.battery()
        expect(commander.send).toBeCalledWith('battery?')
    })

    it('should have command for time check', () => {
        readCommands.time()
        expect(commander.send).toBeCalledWith('time?')
    })

    it('should have command for wifi check', () => {
        readCommands.wifi()
        expect(commander.send).toBeCalledWith('wifi?')
    })

    it('should have command for sdk check', () => {
        readCommands.sdk()
        expect(commander.send).toBeCalledWith('sdk?')
    })

    it('should have command for serial number check', () => {
        readCommands.serial()
        expect(commander.send).toBeCalledWith('sn?')
    })
})