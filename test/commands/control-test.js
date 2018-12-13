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
        controlCommands.takeOff()
        expect(commander.send).toBeCalledWith('takeoff')
    })

    it('should have command for land', () => {
        controlCommands.land()
        expect(commander.send).toBeCalledWith('land')
    })

    it('should have command for emergency', () => {
        controlCommands.emergency()
        expect(commander.send).toBeCalledWith('emergency')
    })

    it('should have command for stop', () => {
        controlCommands.stop()
        expect(commander.send).toBeCalledWith('stop')
    })

    it('should have command for flip left', () => {
        controlCommands.flip.left()
        expect(commander.send).toBeCalledWith('flip l')
    })

    it('should have command for flip right', () => {
        controlCommands.flip.right()
        expect(commander.send).toBeCalledWith('flip r')
    })

    it('should have command for flip front', () => {
        controlCommands.flip.front()
        expect(commander.send).toBeCalledWith('flip f')
    })

    it('should have command for flip back', () => {
        controlCommands.flip.back()
        expect(commander.send).toBeCalledWith('flip b')
    })

    it('should have command for go up', () => {
        const distance = faker.random.number(500)
        controlCommands.move.up(distance)
        expect(commander.send).toBeCalledWith(`up ${distance}`)
    })

    it('should have command for go down', () => {
        const distance = faker.random.number(500)
        controlCommands.move.down(distance)
        expect(commander.send).toBeCalledWith(`down ${distance}`)
    })

    it('should have command for go left', () => {
        const distance = faker.random.number(500)
        controlCommands.move.left(distance)
        expect(commander.send).toBeCalledWith(`left ${distance}`)
    })

    it('should have command for go front', () => {
        const distance = faker.random.number(500)
        controlCommands.move.front(distance)
        expect(commander.send).toBeCalledWith(`forward ${distance}`)
    })

    it('should have command for go back', () => {
        const distance = faker.random.number(500)
        controlCommands.move.back(distance)
        expect(commander.send).toBeCalledWith(`back ${distance}`)
    })

    it('should have command for go right', () => {
        const distance = faker.random.number(500)
        controlCommands.move.right(distance)
        expect(commander.send).toBeCalledWith(`right ${distance}`)
    })

    it('should have command for rotate clockwise', () => {
        const angle = faker.random.number(360)
        controlCommands.rotate.clockwise(angle)
        expect(commander.send).toBeCalledWith(`cw ${angle}`)
    })

    it('should have command for rotate clockwise', () => {
        const angle = faker.random.number(360)
        controlCommands.rotate.counterClockwise(angle)
        expect(commander.send).toBeCalledWith(`ccw ${angle}`)
    })

    it('should have command for go to position', () => {
        const end = {
            x: faker.random.number(500),
            y: faker.random.number(500),
            z: faker.random.number(500)
        }
        const speed = faker.random.number(100)
        controlCommands.go(end,speed)
        expect(commander.send).toBeCalledWith(`go ${end.x} ${end.y} ${end.z} ${speed}`)
    })

    it('should have command for curve to position', () => {
        const start = {
            x: faker.random.number(500),
            y: faker.random.number(500),
            z: faker.random.number(500)
        },
        end = {
            x: faker.random.number(500),
            y: faker.random.number(500),
            z: faker.random.number(500)
        },
        speed = faker.random.number(100)
        controlCommands.curve(start, end, speed)
        expect(commander.send).toBeCalledWith(`curve ${start.x} ${start.y} ${start.z} ${end.x} ${end.y} ${end.z} ${speed}`)
    })

})