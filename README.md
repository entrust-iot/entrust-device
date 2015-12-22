# Entrust Sample Device code

Here is a basic setup for a raspberry pi :

- Image your sd card with 0.6.1 of http://blog.hypriot.com/downloads/
- Boot up the pi
- Login with pi/raspberry
- Execute git clone https://github.com/paxl13/entrust-agent
- Execute git clone https://github.com/paxl13/entrust-device
- Execute apt-get update
- Execute apt-get install npm nodejs
- Execute cd entrust-agent
- Execute docker-compose build

This yeild a functionning either native or with docker container setup.
You can start the agent in docker with the docker-compose up command in the
agent subfolder.

