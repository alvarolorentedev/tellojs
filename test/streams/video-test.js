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

  jest.mock('../../src/exchanger', () => ({
    send: jest.fn()
}))

const video = require('../../src/streams/video.js'),
    dgram = require('dgram'),
    commander = require('../../src/exchanger'),
    constants = require('../../src/constants.json'),
    faker = require('faker')

describe('video stream', () => {
    beforeEach(() => {
        commander.send.mockReset()
        mockSocket.bind.mockReset()
        mockSocket.close.mockReset()
    });
    it('should dgram should has been initialized with udp4', () => {
        expect(dgram.createSocket).toBeCalledWith('udp4')
    })

    it('should bind to listening port', async () => {
        commander.send.mockReturnValue(Promise.resolve())
        await video.bind()
        expect(commander.send).toBeCalledWith('streamon')
        expect(mockSocket.bind).toBeCalledWith(constants.ports.video)
    })

    it('should not bind if errored command', async () => {
        commander.send.mockReturnValue(Promise.reject())
        try {
            await video.bind()
            fail()        
        } catch (error) {
            expect(error).toEqual("Unable to start video stream")
            expect(mockSocket.bind).not.toBeCalled()
        }
    })

    it('should get an event Emitter that receives messages from udp', async () => {
        commander.send.mockReturnValue(Promise.resolve())

        const emitter = await video.bind(),
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

    it('should close socket on listening port and reset emitter', async () => {
        commander.send.mockReturnValue(Promise.resolve())
        await video.close()
        expect(commander.send).toBeCalledWith('streamoff')
        expect(mockSocket.close).toBeCalled()
    })


    it('should not close if unable to close video stream', async () => {
        commander.send.mockReturnValue(Promise.reject())
        try {
            await video.close()
            fail()        
        } catch (error) {
            expect(error).toEqual("Unable to stop video stream")
            expect(mockSocket.close).not.toBeCalled()
        }
    })
})