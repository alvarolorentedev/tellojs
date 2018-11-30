jest.mock('dgram', () => ({
    createSocket: jest.fn(() => mockSocket)
}))

jest.mock('../src/constants.json', ()=>({
    "hosts": {
        "remote": "192.168.10.1"
    },
    "ports":{
        "command": 8889,
        "state": 8890,
        "video": 11111
    }
  }), { virtual: true })

const mockSocket = { send: jest.fn() },
    commandExchange = require('../src/exchanger'),
    dgram = require('dgram'),
    constants = require('../src/constants.json'),
    faker = require('faker')

describe('exchange', () => {
    it('should dgram should has been initialized with udp4', () => {
        expect(dgram.createSocket).toBeCalledWith('udp4')
    })

    it('should have method send able to send commands', async () => {
        const expectedResult = faker.random.uuid(),
            command = faker.random.uuid(),
            expecteBuffer = new Buffer.from(command)

        mockSocket.send.mockImplementation((_,__,___,____,_____,fun) => fun(undefined, expectedResult))

        let result = await commandExchange.send(command)

        expect(mockSocket.send).toBeCalledWith(expecteBuffer, 0, expecteBuffer.length, constants.ports.command, constants.hosts.remote, expect.any(Function))
        expect(result).toEqual(expectedResult)
    })

    it('should fail promise if error', async () => {
        const expectedError = faker.random.uuid(),
            command = faker.random.uuid()

        mockSocket.send.mockImplementation((_,__,___,____,_____,fun) => fun(expectedError))

        expect(commandExchange.send(command)).rejects.toEqual(expectedError)
    })
})