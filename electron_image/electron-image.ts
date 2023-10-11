import { app, BrowserWindow, BrowserView } from 'electron';
import * as fs from 'fs';
import * as path from 'path';
import { randomUUID } from 'crypto';

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
        imageFileName: fname + '.png'
    };

    
    return new Promise((res, rej)=>{

        console.log("opening " + rd.name);
        win.loadURL(rd.name);

        console.debug("listening for paint.")
        win.webContents.on('paint', (event, dirty, image) => {
            console.debug("painted.");
            fs.writeFileSync( fname + '.png', image.toPNG())
            res(resp);
        });
        console.debug("setting frame.");
        win.webContents.setFrameRate(60);

    });
}

app.whenReady().then(()=>{
    console.log("electron imager ready.");
});

export default takeImage;
