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

    it('should have command for height check', () => {
        readCommands.height()
        expect(commander.send).toBeCalledWith('height?')
    })

    it('should have command for temperature check', () => {
        readCommands.temperature()
        expect(commander.send).toBeCalledWith('temp?')
    })

    it('should have command for attitude check', () => {
        readCommands.attitude()
        expect(commander.send).toBeCalledWith('attitude?')
    })

    it('should have command for barometer check', () => {
        readCommands.barometer()
        expect(commander.send).toBeCalledWith('baro?')
    })

    it('should have command for acceleration check', () => {
        readCommands.acceleration()
        expect(commander.send).toBeCalledWith('acceleration?')
    })

    it('should have command for tof check', () => {
        readCommands.tof()
        expect(commander.send).toBeCalledWith('tof?')
    })
})