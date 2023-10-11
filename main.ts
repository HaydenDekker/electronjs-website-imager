import { app, BrowserWindow, BrowserView } from 'electron';
import * as fs from 'fs';
import * as path from 'path';
import imagePort from './image_port/imagePort';

const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        webSecurity: false, // Allow loading insecure content
        offscreen: true,
      },
      show: false
    })

    //const bv = new BrowserView();
    //win.setBrowserView(bv);

    win.loadURL('https://hdekker.com');
    //win.loadURL('https://192.168.8.99:8081/calendar');
    win.webContents.on('paint', (event, dirty, image) => {
        fs.writeFileSync('ex.png', image.toPNG())
      })
    win.webContents.setFrameRate(60)
    console.log(`The screenshot has been successfully saved to ${path.join(process.cwd(), 'ex.png')}`)
  }

  // Disable certificate verification
  app.commandLine.appendSwitch('ignore-certificate-errors'); 

  app.whenReady().then(() => {
    console.log("Main app ready");
    //createWindow();
    imagePort(8083);
  })