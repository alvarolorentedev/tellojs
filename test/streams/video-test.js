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

const video = require('../../src/streams/video.js'),
    dgram = require('dgram'),
    constants = require('../../src/constants.json'),
    faker = require('faker')

describe('video stream', () => {
    it('should dgram should has been initialized with udp4', () => {
        expect(dgram.createSocket).toBeCalledWith('udp4')
    })

    it('should bind to listening port', () => {
        video.bind()
        expect(mockSocket.bind).toBeCalledWith(constants.ports.video)
    })

    it('should get an event Emitter that receives messages from udp', async () => {
        const emitter = video.bind(),
            message = faker.random.uuid(),
            result = new Promise((resolve, reject) => {
                emitter.on('message', (res) => {
                    resolve(res)
                  });
            })
        mockSocket.emit('message', message)
        expect(emitter).toBeInstanceOf(EventEmitter)
        expect(await result).toEqual(message.slice(2))
    })

    it('should close socket on listening port and reset emitter', () => {
        video.close()
        expect(mockSocket.close).toBeCalled()
    })
})