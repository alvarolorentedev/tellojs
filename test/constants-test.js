const constants = require('../src/constants.json')

describe('constants', () => {
    it('should contain remote host ip', () => {
        expect(constants.hosts.remote).toBe('192.168.10.1')
    });
    it('should contain local host ip', () => {
        expect(constants.hosts.local).toBe('0.0.0.0')
    });
    it('should contain port for commands', () => {
        expect(constants.ports.command).toBe(8889)
    });

    it('should contain port for response', () => {
        expect(constants.ports.response).toBe(8001)
    });

    it('should contain port for state', () => {
        expect(constants.ports.state).toBe(8890)
    });

    it('should contain port for video', () => {
        expect(constants.ports.video).toBe(11111)
    });
});