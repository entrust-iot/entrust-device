"use strict";

var agentApi = require("./agentapi");
var authenticated = false;



agentApi.login("123")
    .then(function(res) {
        console.log(res);
        authenticated = true;
    });

//J5 code
var five = require("johnny-five");
var Raspi = require("raspi-io");
var board = new five.Board({io: new Raspi()});

var motionData = {
    delay: 2000,
    start: function() {
        this.timer = setInterval(this.posting, this.delay);
        this.posting();
    },
    stop: function() {
        clearInterval(this.timer);
    },
    posting: function() {
        //Send random data ranging from 600-700
        var max = 700;
        var min = 600;
        if (authenticated) {
            agentApi.send("sensor2", {
                value: (Math.random()*(max-min)) + min
            });
        }
    },
    timer: {}
};

board.on("ready", function() {
    var led = new five.Led("P1-13");
    led.blink(500);

    var button = new five.Button("P1-15");

    button.on("down", function() {
        console.log("Button pressed");
        if(authenticated) {
            console.log("Sending data to the cloud");
            agentApi.send("sensor1", {value: Math.floor(Math.random()*10)});
        }
    });

    var motion = new five.Motion({
        pin: "P1-23"
    });
    motion.on("motionstart", function() {
        console.log("Motion detected, starting to send data from sensor2");
        motionData.start();
    });
    motion.on("motionend", function() {
        console.log("No more motion, stopping data send");
        motionData.stop();
    });
    motion.on("data", function() {
//        console.log(this.value);
    });
motion.on("calibrated", function() {
    console.log("calibrated");
  });
motion.on("change", function() {
 console.log("changed");
});
});
