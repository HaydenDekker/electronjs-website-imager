# Electron JS website imager
Take an image of a website programatically.

Provides a REST GET API to trigger the render of a website, then save as PNG to local file system and provide a response containing the file name and it's location on the local file system.

# Env Variables
Declared in app-config.ts

BASE_DIR_IMAGES - Defines the base directory to store images. Default = './images'

IMAGER_PORT - Defines port for GET api, see imagePort test

# Tests

To run tests see package.json -> scripts and execute relevant script e.g. 'npm run test'

## System
1. Send a website url, with a desired height and width of a display and expect a filename, of specified size and representing the webpage, is returned and a file is present in the configured folder.

## ImagePort
1. Open a rest interface to the application and send packet to it representing the website object, expect electronimager is called and data can be received.

# Deployment
deploy/Jenkinsfile - Load this on the target jenkins instance and provide target server and credentials before running. This copies the application to a local folder before running deploy/runtime_env/dockerfile to build the image and starting the container.

deploy/runtime_env/dockerfile - This dockerfile installs nodejs, copies the application over and uses a headless display driver to run electronJS behind the scenes. This file is used by the Jenkinsfile above.

# Useage
With the service running,
Execute, 
`curl -X GET "http://localhost:8084/?height=200&width=1100&name=http://hdekker.com"`
and observe the image in the configured folder after the response is returned.

# TODO
- Manage Browser Windows - Closing the last open electron browser window triggers electron to close the entire application. This would require docker to restart after each operation. Keeping the window open allows the app to remain available for requests but that means managing the growing number window created.