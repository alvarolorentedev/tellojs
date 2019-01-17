const sdk = require('../src/index')

sdk.control.connect()
.then(() => sdk.control.takeOff())
.then(() => sdk.control.flip.left())
.then(() => sdk.control.flip.right())
.then(() => sdk.control.land())
.then(result => console.log(result))
.catch(error => console.error(error))
