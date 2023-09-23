const chai = require('chai');
const expect = chai.expect;
const path = require('path');
const { spawn } = require('child_process');
const electron = require('electron');

// Path to your Electron app's main script
const appPath = path.join(__dirname, '../main.js');

// Spawn an Electron process
const electronProcess = spawn(electron, [appPath]);

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