const sdk = require('../src/index')
const child_process = require("child_process")

sdk.control.connect()
.then(() => sdk.control.takeoff())
.then(() => sdk.control.flip('b'))
.then(() => sdk.control.land())
.then((result) => console.log(result))
.then((error) => console.error(error))
