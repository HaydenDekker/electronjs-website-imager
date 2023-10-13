import * as chai from 'chai';
const expect: Chai.ExpectStatic = chai.expect;
import * as path from 'path';
import { spawn, ChildProcess } from 'child_process';
import axios from 'axios'
import fs from 'fs';
import {_BASE_DIR_IMAGES} from '../app-config'

// Path to your Electron app's main script
const appPath = path.join(__dirname, '../main.js');
// Spawn an Electron process
const electronProcess = spawn(
        path.join(__dirname,'../../node_modules/electron/dist/electron.exe'), 
        [appPath]);

// Handle Electron process events
electronProcess.stdout.on('data', (data) => {
  console.log(`Electron stdout: ${data}`);
});

electronProcess.stderr.on('data', (data) => {
  console.error(`Electron stderr: ${data}`);
});

electronProcess.on('close', (code) => {
  console.log(`Electron process exited with code ${code}`);
});

async function callInterface(queryParams : RequestData, imagePortPortNumber: number){
  const resp: RequestResponse = (await axios.get('http://localhost:' + imagePortPortNumber.toString() + '/', {
      params: queryParams
  })).data;
  return resp;
}

function checkForFile(fileName: string): Promise<String>{
  return new Promise((res, rej)=>{
      fs.access( fileName, fs.constants.F_OK, (err) => {
          if (err) {
              console.error('File'
                  + fileName 
                  + ' does not exist');
              rej(err);
          } else {
              console.log('File ' + fileName + ' exists');
              res(fileName);
          }
      });

  });

}

describe('Electron Process', () => {

  afterEach(function(){
    electronProcess.kill();
  });

  it('should start electron for testing.', (done) => {

      const rd: RequestData = {
        height: 200,
        width: 2000,
        name: "http://hdekker.com"
      }

      const rd2: RequestData = {
        height: 200,
        width: 2000,
        name: "http://github.com"
      }

      const rdArr: Array<RequestData> = [rd, rd2];
      const promises: Promise<String>[] = [];

      setTimeout(async ()=>{
        rdArr.forEach(async data => {
          const resp = callInterface(data, 8083)
            .then((r)=>checkForFile(r.imageFileName));
          promises.push(resp);
        });
        const files = await Promise.all(promises);
        files.forEach(f=>{
          expect(f).not.null;
        })
        done();
      }, 4000);

  }).timeout(30000);
});