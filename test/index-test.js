jest.mock('../src/commands/control', () => jest.fn())
jest.mock('../src/commands/read', () => jest.fn())
jest.mock('../src/commands/set', () => jest.fn())
jest.mock('../src/streams/state', () => jest.fn())
jest.mock('../src/streams/video', () => jest.fn())

const controlCommands = require('../src/commands/control'),
    readCommands = require('../src/commands/read'),
    setCommands = require('../src/commands/set'),
    stateStream = require('../src/streams/state'),
    videoStream = require('../src/streams/video'),
    index = require('../src/index')

describe('index', () => {
    it('should export read commands', () => {
        expect(index.read).toBe(readCommands)
    })

    it('should export control commands', () => {
        expect(index.control).toBe(controlCommands)
    })

    it('should export control commands', () => {
        expect(index.set).toBe(setCommands)
    })

    it('should export state stream', () => {
        expect(index.receiver.state).toBe(stateStream)
    })

    it('should export video stream', () => {
        expect(index.receiver.video).toBe(videoStream)
    })
})