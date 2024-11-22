// import { groqLLM } from './config.js';

// async function testGroq() {
//     const response = await groqLLM.invoke("What's the current status of the Argentinian politics ?");
//     console.log(response);
// }

// testGroq();


// import { loadCNNNews } from './loaders/cnnLoader.js';

// async function testLoader() {
//     const docs = await loadCNNNews();
//     console.log("Number of documents loaded:", docs.length);
//     console.log("Sample document:", docs[0]);
// }

// testLoader();

import { loadCNNNews } from './loaders/cnnLoader.js';
import { loadCBCNews } from './loaders/cbcLoader.js';

async function testLoaders() {
    console.log("Loading CNN News...");
    const cnnDocs = await loadCNNNews();
    
    console.log("\nLoading CBC News...");
    const cbcDocs = await loadCBCNews();
    
    console.log("\nTotal documents loaded:");
    console.log("CNN:", cnnDocs.length);
    console.log("CBC:", cbcDocs.length);
}

testLoaders();