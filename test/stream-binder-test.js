jest.mock('dgram', () => ({
    createSocket: jest.fn(() => mockSocket)
}))

jest.mock('../src/constants.json', ()=>({
    "hosts": {
        "remote": "192.168.10.1",
        "local": "0.0.0.0"
    },
    "ports":{
        "command": 8889,
        "state": 8890,
        "video": 11111
    }
  }), { virtual: true })

const mockSocket = { bind: jest.fn(), close: jest.fn() },
    binder = require('../src/stream-binder')
    dgram = require('dgram'),
    constants = require('../src/constants.json'),
    faker = require('faker')

describe('streamer', () => {
    it('should dgram should has been initialized with udp4', () => {
        expect(dgram.createSocket).toBeCalledWith('udp4')
    })

    it('should bind the udp server video port', async () => {
        const expectedResult = faker.random.uuid()

        mockSocket.bind.mockImplementation((_,__,fun) => fun(undefined, expectedResult))

        let result = await binder.video.start()

        expect(mockSocket.bind).toHaveBeenCalledWith(constants.ports.video, constants.hosts.local, expect.any(Function))
        expect(result).toEqual(expectedResult)
    });

    it('should bind the udp server state port', async () => {
        const expectedResult = faker.random.uuid()

        mockSocket.bind.mockImplementation((_,__,fun) => fun(undefined, expectedResult))

        let result = await binder.state.start()

        expect(mockSocket.bind).toHaveBeenCalledWith(constants.ports.state, constants.hosts.local, expect.any(Function))
        expect(result).toEqual(expectedResult)
    });

    it('should reject if error with udp bind for video', async () => {
        const expectedError = faker.random.uuid()

        mockSocket.bind.mockImplementation((_,__,fun) => fun(expectedError))

        expect(binder.video.start()).rejects.toEqual(expectedError)
    });

    it('should reject if error with udp bind for state', async () => {
        const expectedError = faker.random.uuid()

        mockSocket.bind.mockImplementation((_,__,fun) => fun(expectedError))

        expect(binder.state.start()).rejects.toEqual(expectedError)
    });
    
    it('should unbind the udp server video port', async () => {

        binder.video.stop()

        expect(mockSocket.close).toHaveBeenCalledWith()
    });

    it('should unbind the udp server state port', async () => {

        binder.state.stop()

        expect(mockSocket.close).toHaveBeenCalledWith()
    });
    
});

// var message = new Buffer('streamon')
// client.send(message, 0, message.length, constants.ports.command, constants.host, function(err, bytes) {
//     if (err) throw err
// })

// serverImages.on('listening', function () {
//     var address = server.address();
//     console.log('UDP Server listening on ' + address.address + ":" + address.port);
// });

// serverImages.on('message', function (message, remote) {
//     console.log(remote.address + ':' + remote.port +' - ' + message);

// });

// serverImages.bind(constants.ports.video, '0.0.0.0');