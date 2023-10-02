import * as chai from 'chai';
const expect: Chai.ExpectStatic = chai.expect;
import axios from 'axios'
import startImagePort from '../image_port/imagePort';

interface RequestData {
    name: string;
    height: number;
    width: number;
    }

async function callInterface(){

    const resp: String = (await axios.get('http://localhost:8081/')).data;     
    return resp;

}

describe('Rest Interface Definition', () => {

    let server;

    before(async function () {
        // Start the Express.js server before running tests
        server = await startImagePort();

    });

    it('should accept a website image request', async function () {
     
        const resp = await callInterface();
        expect(resp).to.equal('Hello World!');

    });
  });
