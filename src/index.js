const controlCommands = require('./commands/control'),
readCommands = require('./commands/read')
setCommands = require('./commands/set')


module.exports = { 
    control: controlCommands,
    read: readCommands,
    set: setCommands
 }