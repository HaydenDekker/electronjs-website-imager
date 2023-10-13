import { app, BrowserWindow, BrowserView } from 'electron';
import * as fs from 'fs';
import * as path from 'path';
import imagePort from './image_port/imagePort';
import takeImage from './electron_image/electron-image';
import { _IMAGER_PORT } from './app-config';

  // Disable certificate verification
  app.commandLine.appendSwitch('ignore-certificate-errors'); 

  app.whenReady().then(() => {
    console.log("Main app ready");
    imagePort(_IMAGER_PORT, takeImage);
  });