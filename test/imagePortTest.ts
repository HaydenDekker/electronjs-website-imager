import * as chai from 'chai';
const expect: Chai.ExpectStatic = chai.expect;
import axios from 'axios'
import './spawnElectron'
import imagePort from '../image_port/imagePort';
import { Application } from 'express';
import { Server } from 'http';
import fs from 'fs';

const targetEndpoint: string = "http://localhost:8081";
const imagePortPortNumber = 8083;

const queryParams : RequestData = {
        name: targetEndpoint,
        height: 700,
        width: 800
    };

async function callInterface(){

    const resp: RequestResponse = (await axios.get('http://localhost:' + imagePortPortNumber.toString() + '/', {
        params: queryParams
    })).data;
    return resp;

}

function checkForFile(fileName: string){
    return new Promise((res, rej)=>{

        // Use fs.access to check if the file exists
        fs.access(fileName, fs.constants.F_OK, (err) => {
            if (err) {
                console.error('File'
                    + fileName 
                    + ' does not exist');
                rej(err);
            } else {
                console.log('File ' + fileName + 'exists');
                res(fileName);
            }
        });

    });

}

describe('Image Port Interface Definition', () => {

    let server: Server;

    before(async function () {
        // Start the Express.js server before running tests
        server = await imagePort(imagePortPortNumber);

    });

    after(function(){
        server.close();
    })

    it('should accept a website image request', async function () {

        const resp: RequestResponse = await callInterface();
        expect(resp.requestData.name).to.equal(targetEndpoint);
        const fileOnSystem = await checkForFile(resp.imageFileName);
        expect(fileOnSystem).not.null;

    }).timeout(70000);

  });
