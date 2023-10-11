import * as path from 'path';
import { spawn, ChildProcess } from 'child_process';

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