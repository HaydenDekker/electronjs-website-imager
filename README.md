# Electron JS website imager
Take an image of a website programatically.

Provides a REST GET API to trigger the render of a website, a save to local file system and a response containing the file and location information on the local file system.

# Env Variables
BASE_DIR_IMAGES - Defines the base directory to store images. Default = './images'

# Tests
## System
1. Send a website url, with a desired height and width of a display and expect a filename, of specified size and representing the webpage, is returned and a file is present in the configured folder.

## ImagePort
1. Open a rest interface to the application and send packet to it representing the website object, expect electronimager is called and data can be received.