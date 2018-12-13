jest.mock('../src/commands/control', () => jest.fn())
jest.mock('../src/commands/read', () => jest.fn())
jest.mock('../src/commands/set', () => jest.fn())

const controlCommands = require('../src/commands/control'),
    readCommands = require('../src/commands/read'),
    setCommands = require('../src/commands/set'),
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
})