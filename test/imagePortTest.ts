import * as chai from 'chai';
const expect: Chai.ExpectStatic = chai.expect;
import axios from 'axios'
import './spawnElectron'
import imagePort from '../image_port/imagePort';
import { Application } from 'express';
import { Server } from 'http';


const targetEndpoint: string = "http://localhost:8081";
const imagePortPortNumber = 8084;

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

function imageScraperMock(rd: RequestData): Promise<RequestResponse>{
    return new Promise((res,rej)=>{
        const resp: RequestResponse = {
            requestData: rd,
            imageFileName: targetEndpoint
        }
        res(resp);
    });
}

describe('Image Port Interface Definition', () => {

    let server: Server;

    before(async function () {
        server = await imagePort(imagePortPortNumber, imageScraperMock);
    });

    after(function(){
        server.close();
    })

    it('should accept a website image request', async function () {
        const resp: RequestResponse = await callInterface();
        expect(resp.requestData.name).to.equal(targetEndpoint);
    }).timeout(70000);

  });
