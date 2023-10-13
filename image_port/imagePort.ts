import { App } from 'electron';
import express, { Application } from 'express'
import { Server } from 'http';
import { resolve } from 'path';
import takeImage from '../electron_image/electron-image';

const app = express();
let serverInstance: any = null;

function imagePort(port: number): Promise<Server>{

    return new Promise((res, rej) =>{

        if (serverInstance) {
            // If the server is already running, resolve with the existing app instance
            resolve(serverInstance);
            return;
          }

        app.get('/', async (req, res) => {

            const rd: RequestData = {
                name: req.query.name as string,
                height: Number(req.query.height),
                width: Number(req.query.width),
            };

            // Check if any required properties are missing or invalid
            if (!rd.name || isNaN(rd.height) || isNaN(rd.width)) {
                res.status(400).json({ error: 'Invalid request data' });
                return;
            }

            console.log("Requesting image for " + JSON.stringify(rd));
            const resp = await takeImage(rd);

            res.send(resp);
        })
        
        serverInstance = app.listen(port, () => {
            console.log(`Example app listening on port ${port}`);
        })

        res(serverInstance);

        app.on('error', (error)=>{
            rej(error);
        })

    });
    
}

export default imagePort;