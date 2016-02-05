# Entrust Sample Device code

Here is a basic setup for a raspberry pi :

- Image your sd card with 0.6.1 of http://blog.hypriot.com/downloads/
- Boot up the pi
- Login with pi/raspberry
- Execute `sudo apt-get update`
- Execute `sudo apt-get install npm nodejs`
- (Raspberry Pi) install wiringPi http://wiringpi.com/download-and-install/
- `sudo ln -s ``which nodejs`` /usr/bin/node`
- Execute `git clone https://github.com/entrust-iot/entrust-device`
- Execute `cd entrust-device`
- `cd src`
- `npm install`
- `cd -`
- `sudo node <platform>.js`
