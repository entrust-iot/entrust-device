//configure_edison --wifi
//vi /etc/opkg/base-feeds.conf
/**
 * Add the following repos:
 src all     http://iotdk.intel.com/repos/1.1/iotdk/all
 src x86 http://iotdk.intel.com/repos/1.1/iotdk/x86
 src i586    http://iotdk.intel.com/repos/1.1/iotdk/i586
 **/
//opkg update
//opkg install git

"use strict";

var agentApi = require("./agentapi");
var indusInitialized = false;
//Run the agent as a library
var agent = require("../../entrust-agent/src/index");

agentApi.login("123")
    .then(function(res) {
        console.log(res);
        indusInitialized = true;
    });

var five = require("johnny-five");
var Edison = require("galileo-io");
var board = new five.Board({
    io: new Edison()
});

board.on("ready", function() {
    var led = new five.Led(13);
    led.blink(500);
    var button = new five.Button(4);
    button.on("down", function() {
        console.log("Button is down");
        if (indusInitialized) {
            agentApi.send("sensor1", {value: Math.floor(Math.random()*10)});
        }
    });
    button.on("up", function() {
        console.log("Button is up");
    });
    var photoresistor = new five.Sensor({
        pin: "A3",
        freq: 1000
    });
    photoresistor.on("data", function() {
        console.log("Photoresistor data: " + this.value);
        if (indusInitialized) {
            console.log("Sending data to Edge");
            agentApi.send("sensor2", {value: this.value});
        }
    });
});