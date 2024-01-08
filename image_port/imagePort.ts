import { App } from 'electron';
import express, { Application } from 'express'
import { Server } from 'http';
import { resolve } from 'path';

const app = express();
let serverInstance: any = null;

function imagePort(port: number, imageScraper: ImageScraper): Promise<Server>{

    console.log("Starting image port. ");
    return new Promise((res, rej) =>{
        if (serverInstance) {
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
            const resp = await imageScraper(rd);

            res.send(resp);
        })
        
        serverInstance = app.listen(port, () => {
            console.log(`Example app listening on port ${port}`);
        })

        res(serverInstance);

        app.on('error', (error)=>{
            console.log(error);
            rej(error);
        })

    });
    
}

export default imagePort;