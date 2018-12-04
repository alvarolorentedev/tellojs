# ![logomakr_123ujk](https://user-images.githubusercontent.com/3071208/49430616-cddbc300-f7ab-11e8-9356-381c730d0839.png)

An unuficial sdk for tello based on the documentation.

## Installation

add it to your project using `npm install tellojs --save` or `yarn add tellojs`

## Usage

this sdk provide functions when you import for the next capabilities:

```js
const sdk = require('../src/index')
//CONTROL COMMANDS
await sdk.control.connect()                     // Enter SDK mode.
await sdk.control.takeoff()                     // Auto takeoff.
await sdk.control.land()                        // Auto landing.
await sdk.control.emergency()                   // Stop motors immediately
await sdk.control.stop()                        // Hovers in the air
await sdk.control.move.up(x)                    // Ascend to “x” cm.
await sdk.control.move.down(x)                  // Descend to “x” cm.
await sdk.control.move.left(x)                  // move left to “x” cm.
await sdk.control.move.right(x)                 // move right to “x” cm.
await sdk.control.move.front(x)                 // move forward to “x” cm.
await sdk.control.move.back(x)                  // move backwards to “x” cm.
await sdk.control.rotate.clockwise(x)           // rotate clockwise 'x' degrees.
await sdk.control.rotate.counterClockwise(x)    // rotate counter clockwise 'x' degrees.
await sdk.control.flip.left()                   // Flip to the left.
await sdk.control.flip.right()                  // Flip to the right.
await sdk.control.flip.back()                   // Flip in backward.
await sdk.control.flip.front()                  // Flip in forward.

//READ COMMANDS
await sdk.read.speed()                          // Obtain current speed (cm/s).
await sdk.read.battery()                        // Obtain current battery percentage.
await sdk.read.time()                           // Obtain current flight time.
await sdk.read.wifi()                           // Obtain Wi-Fi SNR.
await sdk.read.sdk()                            // Obtain the Tello SDK version.
await sdk.read.serial()                         // Obtain the Tello serial number
```

##### Web graphic by <a href="http://www.flaticon.com/authors/picol">picol</a> from <a href="http://www.flaticon.com/">Flaticon</a> is licensed under <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">CC BY 3.0</a>. Check out the new logo that I created on <a href="http://logomakr.com" title="Logo Makr">LogoMakr.com</a> https://logomakr.com/09u4Zz
