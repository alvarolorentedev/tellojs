const EventEmitter = require('events')
class TestEmitter extends EventEmitter {
}

const mockSocket =new TestEmitter()
mockSocket.bind = jest.fn()
mockSocket.close = jest.fn()

jest.mock('dgram', () => ({
    createSocket: jest.fn(() => mockSocket)
}))

jest.mock('../../src/constants.json', ()=>({
    "hosts": {
        "remote": "192.168.10.1"
    },
    "ports":{
        "command": 8889,
        "response": 8001,
        "state": 8890,
        "video": 11111
    }
  }), { virtual: true })

const state = require('../../src/streams/state.js'),
    dgram = require('dgram'),
    constants = require('../../src/constants.json'),
    faker = require('faker')

describe('state stream', () => {
    it('should dgram should has been initialized with udp4', () => {
        expect(dgram.createSocket).toBeCalledWith('udp4')
    })

    it('should bind to listening port', () => {
        state.bind()
        expect(mockSocket.bind).toBeCalledWith(constants.ports.state)
    })

    it('should get an event Emitter that receives messages from udp', async () => {
        const emitter = state.bind(),
            message = faker.random.uuid(),
            result = new Promise((resolve, reject) => {
                emitter.on('message', (res) => {
                    resolve(res)
                  });
            })
        mockSocket.emit('message', message)
        expect(emitter).toBeInstanceOf(EventEmitter)
        expect(await result).toEqual(message)
    })

    it('should close socket on listening port and reset emitter', () => {
        state.close()
        expect(mockSocket.close).toBeCalled()
    })
})