import { app, BrowserWindow, BrowserView } from 'electron';
import * as fs from 'fs';
import * as path from 'path';
import { randomUUID } from 'crypto';
import {_BASE_DIR_IMAGES} from '../app-config'

function takeImage(rd: RequestData): Promise<RequestResponse>{


    console.log("creating browser.");

    const win = new BrowserWindow({
        width: rd.width,
        height: rd.height,
        webPreferences: {
          webSecurity: false, // Allow loading insecure content
          offscreen: true,
        },
        show: false
      })

    const fname = randomUUID();

    let resp: RequestResponse = {
        requestData: rd,
        imageFileName: _BASE_DIR_IMAGES + '/' + fname + '.png'
    };

    
    return new Promise(async (res, rej)=>{

        console.log("opening " + rd.name);
        await win.loadURL(rd.name);

        console.debug("listening for paint.")
        win.webContents.on('paint', (event, dirty, image) => {
            console.debug("painted.");
            fs.writeFileSync( resp.imageFileName, image.toPNG())
            //win.close();
            console.debug("Sending resp.");
            res(resp);
        });
        win.webContents.setFrameRate(1);

    });
}

app.whenReady().then(()=>{
    console.log("electron imager ready.");
});

export default takeImage;
