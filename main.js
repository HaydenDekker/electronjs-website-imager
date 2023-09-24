"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const createWindow = () => {
    const win = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            webSecurity: false,
            offscreen: true,
        },
        show: false
    });
    //const bv = new BrowserView();
    //win.setBrowserView(bv);
    win.loadURL('https://hdekker.com');
    //win.loadURL('https://192.168.8.99:8081/calendar');
    win.webContents.on('paint', (event, dirty, image) => {
        fs.writeFileSync('ex.png', image.toPNG());
    });
    win.webContents.setFrameRate(60);
    console.log(`The screenshot has been successfully saved to ${path.join(process.cwd(), 'ex.png')}`);
};
// Disable certificate verification
electron_1.app.commandLine.appendSwitch('ignore-certificate-errors');
electron_1.app.whenReady().then(() => {
    createWindow();
});
