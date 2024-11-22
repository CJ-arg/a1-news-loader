import { RecursiveUrlLoader } from "@langchain/community/document_loaders/web/recursive_url";
import { JSDOM } from 'jsdom';

export const loadCBCNews = async () => {
  const url = "https://www.cbc.ca/lite/news?sort=latest";
  
  const loader = new RecursiveUrlLoader(url, {
    maxDepth: 1,
    excludeDirs: ["/lite/api/","search", "author", "tag", "category"],
    preventOutside: true,
    extractor: (html, url) => {
      const dom = new JSDOM(html);
      const document = dom.window.document;
      
      const articles = document.querySelectorAll('li');
      let newsContent = [];
      
      articles.forEach(article => {
        const link = article.querySelector('a');
        const title = link?.textContent;
        
        if (title) {
          newsContent.push({
            title: title.trim(),
            url: link.href,
            source: 'CBC News'
          });
        }
      });

      return newsContent;
    }
  });

  try {
    const docs = await loader.load();
    console.log("First CBC news item:", JSON.stringify(docs[0], null, 2));
    return docs;
  } catch (error) {
    console.error("Error loading CBC news:", error);
    throw error;
  }
};
