const {spawn} = require('child_process')
const sdk = require('../src/index')

const bindVideo = async () => {
    const h264encoder_spawn = {
                    "command": 'mplayer',
                    "args": ['-gui', '-nolirc', '-fps', '35', '-really-quiet', '-']
                }
    const h264encoder = spawn(h264encoder_spawn.command, h264encoder_spawn.args)
    const videoEmitter = await sdk.receiver.video.bind() 
    videoEmitter.on('message', msg => h264encoder.stdin.write(msg))
}

sdk.control.connect()
.then(() => bindVideo())
.then((result) => console.log(result))
.catch((error) => console.error(error))