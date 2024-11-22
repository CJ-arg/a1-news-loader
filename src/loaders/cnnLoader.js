// import { RecursiveUrlLoader } from "@langchain/community/document_loaders/web/recursive_url";

// export const loadCNNNews = async () => {
//   const url = "https://cnnespanol.cnn.com/lite/";
  
//   const loader = new RecursiveUrlLoader(url, {
//     maxDepth: 2,
//     excludeDirs: ["search", "author", "tag"],
//     preventOutside: true
//   });

//   try {
//     const docs = await loader.load();
//     return docs;
//   } catch (error) {
//     console.error("Error loading CNN news:", error);
//     throw error;
//   }
// };

import { RecursiveUrlLoader } from "@langchain/community/document_loaders/web/recursive_url";
import { JSDOM } from 'jsdom';

export const loadCNNNews = async () => {
  const url = "https://cnnespanol.cnn.com/lite/";
  
  const loader = new RecursiveUrlLoader(url, {
    maxDepth: 1,
    excludeDirs: ["/lite/api/","search", "author", "tag", "category"],
    preventOutside: true,
    extractor: (html, url) => {
      const dom = new JSDOM(html);
      const document = dom.window.document;
      
      // Selectors específicos para CNN Español lite
      const articles = document.querySelectorAll('li');
      let newsContent = [];
      
      articles.forEach(article => {
        const link = article.querySelector('a');
        const title = link?.textContent;
        
        if (title) {
          newsContent.push({
            title: title.trim(),
            url: link.href,
            source: 'CNN Español'
          });
        }
      });

      return newsContent;
    }
  });

  try {
    const docs = await loader.load();
    console.log("First news item:", JSON.stringify(docs[0], null, 2));
    return docs;
  } catch (error) {
    console.error("Error loading CNN news:", error);
    throw error;
  }
};



