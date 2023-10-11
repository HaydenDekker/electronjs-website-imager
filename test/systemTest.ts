import * as chai from 'chai';
const expect: Chai.ExpectStatic = chai.expect;
import * as path from 'path';
import { spawn, ChildProcess } from 'child_process';
import axios from 'axios'

//import * as electron from 'electron';

// Path to your Electron app's main script
const appPath = path.join(__dirname, '../main.js');
// Spawn an Electron process
// C:/Users/Hayden Dekker/workspace_23/electronjs-website-imager
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

describe('Electron Process', () => {

  it('should start electron for testing.', (done) => {

      const rd: RequestData = {
        height: 200,
        width: 2000,
        name: "http://hdekker.com"
      }

      setTimeout(async ()=>{
        const resp = await callInterface(rd, 8083);
        console.log("resp received.");
        done();
      }, 4000);

  }).timeout(30000);
});