import { groqLLM } from './config.js';

async function testGroq() {
    const response = await groqLLM.invoke("What's the current status of the Argentinian politics ?");
    console.log(response);
}

testGroq();
