import express from 'express'
import { resolve } from 'path';

const app = express();
const port = 8081;

function startImagePort(){
    return new Promise((res, rej) =>{

        app.get('/', (req, res) => {
            res.send('Hello World!')
        })
        
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
            res(app);
        })

        app.on('error', (error)=>{
            rej(error);
        })

    });
    
}

export default startImagePort;