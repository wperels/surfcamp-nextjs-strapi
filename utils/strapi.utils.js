import axios from 'axios';
//import Link from 'next/link';


const BASE_URL = process.env.STRAPI_URL || "http://127.0.0.1:1337";

export async function fetchDataFromStrapi(route) {
  const url = `${BASE_URL}/api/${route}`;

      try {
        const response = await axios.get(url)
        return response.data.data
      } catch (err) {
        console.log(err)
        throw new Error(`Failed to fetch data from: ${url}`);
      }
}

export function processInfoBlocks(data) {
  const infoBlocksRaw = data.info_blocks
  return infoBlocksRaw.map( (infoBlock) => ({
    ...infoBlock.attributes,
      id: infoBlock.id,
      showimageRight: infoBlock.showimageRight,
      imageSrc: BASE_URL + infoBlock.image?.formats?.thumbnail?.url,
      headline: infoBlock.headline,
      text: infoBlock.text[0].children[0].text,
      button: createInfoBlockButton(infoBlock.button)

  }))
}

export function createInfoBlockButton(buttonData) {
  if (!buttonData) {
    return null
  }
      /*  { Link element moved to InfoBlock.js } 
      return (
          <Link href={`/${buttonData.slug}`} 
          className= {`btn btn-medium btn--${buttonData.color}`}
          >{buttonData.text}</Link>
      ) */
   return {
    text: buttonData.text,
    slug: buttonData.slug,
    color: buttonData.color
  }
}

export async function fetchBlogArticles() {
  const blogData = await fetchDataFromStrapi('blog-articles?populate[articleContent][populate]=*&populate=featuredImage')
    
    const processBlogArticles = blogData.map(processBlogArticle)
      processBlogArticles.sort(
        (a, z) => new Date(z.publishedAt) - new Date(a.publishedAt)
      )
  
  return processBlogArticles
}

function processBlogArticle(article) {
  return {
     ...article,
      id: article.id,
      featuredImage: article.featuredImage?.url ? BASE_URL + article.featuredImage.url : null,
      articleContent: article.articleContent || []
  }

}

function processImageTextComponent(component) {

  return {
    ...component.attributes,
    id: component.id,
    paragraph: component.paragraph,
    imageCaption: component.imageCaption,
    image: BASE_URL + component.image?.formats?.thumbnail?.url,
    isLandscape: component.isLandscape,
    imageShowsRight: component.imageShowsRight,
    articleContent: article.articleContent || []
  }
}

// Format a date string into a human-readable format
export function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' }; 
  return date.toLocaleDateString('en-US', options);
}

export function extractImageUrl(imageData) {
  if (!imageData || typeof imageData !== 'object') return '';
  return BASE_URL + (imageData.url || imageData.formats?.thumbnail?.url || '');
}
