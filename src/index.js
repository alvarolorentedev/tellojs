const controlCommands = require('./commands/control'),
readCommands = require('./commands/read')
setCommands = require('./commands/set')
stateStream = require('./streams/state')
videoStream = require('./streams/video')


module.exports = { 
    control: controlCommands,
    read: readCommands,
    set: setCommands,
    receiver: {
        state: stateStream,
        video: videoStream
    }
 }