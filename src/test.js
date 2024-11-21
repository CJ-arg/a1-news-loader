import { groqLLM } from './config.js';

async function testGroq() {
    const response = await groqLLM.invoke("What's the current status of the connection?");
    console.log(response);
}

testGroq();
