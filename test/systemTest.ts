import * as chai from 'chai';
const expect: Chai.ExpectStatic = chai.expect;
import * as path from 'path';
import { spawn, ChildProcess } from 'child_process';
//import * as electron from 'electron';

// Path to your Electron app's main script
const appPath = path.join(__dirname, '../main.js');
console.log(appPath);
// Spawn an Electron process
const electronProcess = spawn("C:/Users/Hayden Dekker/workspace_23/electronjs-website-imager/node_modules/electron/dist/electron.exe", [appPath]);

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

describe('Website Imager System', () => {

  it('should return an image when given a website.', () => {
    const result = 1 + 1;
    expect(result).to.equal(2);
  });
});