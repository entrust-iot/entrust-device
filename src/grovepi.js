var GrovePi = require('node-grovepi').GrovePi
var Commands = GrovePi.commands
var Board = GrovePi.board
var UltrasonicDigitalSensor = GrovePi.sensors.UltrasonicDigital
var AirQualityAnalogSensor = GrovePi.sensors.AirQualityAnalog
var DHTDigitalSensor = GrovePi.sensors.DHTDigital
var LightAnalogSensor = GrovePi.sensors.LightAnalog

var board

function start() {
  console.log('starting')

  board = new Board({
    debug: true,
    onError: function(err) {
      console.log('TEST ERROR')
      console.log(err)
    },
    onInit: function(res) {
      if (res) {
        var ultrasonicSensor = new UltrasonicDigitalSensor(4)
        // Digital Port 4
        var dhtSensor = new DHTDigitalSensor(3, DHTDigitalSensor.VERSION.DHT111111111111, DHTDigitalSensor.CELSIUS)
        // Digital Port 3
        var lightSensor = new LightAnalogSensor(2)
        // Analog Port 2

        console.log('GrovePi Version :: ' + board.version())

        // Ultrasonic Ranger
        console.log('Ultrasonic Ranger Digital Sensor (start watch)')
        ultrasonicSensor.on('change', function(res) {
          console.log('Ultrasonic Ranger onChange value=' + res)
        })
        ultrasonicSensor.watch(1000)

        // DHT Sensor
        console.log('DHT Digital Sensor (start watch)')
        dhtSensor.on('change', function(res) {
          console.log('DHT onChange value=' + res)
        })
        dhtSensor.watch(500) // milliseconds

        // Light Sensor
        console.log('Light Analog Sensor (start watch)')
        lightSensor.on('change', function(res) {
          console.log('Light onChange value=' + res)
        })
        lightSensor.watch(5000)

      }
    }
  })
  board.init()
}

function onExit(err) {
  console.log('ending')
  board.close()
  process.removeAllListeners()
  process.exit()
  if (typeof err != 'undefined')
    console.log(err)
}

// starts the test
start()
// catches ctrl+c event
process.on('SIGINT', onExit)
