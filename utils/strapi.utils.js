import axios from 'axios';
import qs from 'qs';


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
     //key: infoBlock.id,
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
          >{buttonData.text}</Link>) */
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
// is this used?
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

 // Helper function to render paragraph content
 //extracts the text from each child and joins them together with a newline character.
export function renderParagraphContent(paragraphArray) {
  if (!paragraphArray || !Array.isArray(paragraphArray)) return '';
  
  return paragraphArray.map((para) => {
    if (para.type === 'paragraph' && para.children) {
      return para.children.map(child => child.text).join('');
    }
    return '';
  }).join('\n\n');
}

// Format a date string into a human-readable format
export function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }; 
  return date.toLocaleDateString('en-US', options);
}

//Extract the URL of an image from the given image data.
export function extractImageUrl(imageData) {
  if (!imageData || typeof imageData !== 'object') return '';
  return BASE_URL + (imageData.url || imageData.formats?.thumbnail?.url || '');
}


//Extract the URL of an image from the given image data.
export function extractLandscapeImageUrl(imageData) {
  if (!imageData) return '';
  
  // If imageData is already a string (URL path), prepend BASE_URL
  if (typeof imageData === 'string') {
    return imageData.startsWith('http') ? imageData : BASE_URL + imageData;
  }
  
  // If imageData is an object, extract the URL
  if (typeof imageData === 'object') {
    const url = imageData.url || imageData.image?.[0]?.url;
    return url ? BASE_URL + url : '';
  }
  
  return '';
}

export async function fetchIndividualEvent(documentId) {
  try {
    //console.log('Fetching:', ${BASE_URL}/api/events/${documentId})
    const response = await axios.get(`${BASE_URL}/api/events/${documentId}`)
    return processEventData(response.data.data)  // Return just the data portion
  } catch (err) {
    console.error(`Failed to fetch event ${documentId}:`, err.message)
    throw err
  }
}

//article.featuredImage?.url ? BASE_URL + article.featuredImage.url : null,
export function processEventData(event) {

  // Image is nested in attributes.Image.data.attributes.url in Strapi v5
  const imageUrl = event.attributes?.image?.data?.attributes?.url || 
                   event.image?.url ||
                   null;

  const startingDate = event.attributes?.startingDate || event.startingDate;                 

  return {
    ...event.attributes,
      id: event.id,
      documentId: event.documentId,
      name: event.name,
      description: event.description,
      singlePrice: event.singlePrice,
      sharedPrice: event.sharedPrice,
      startingDate: startingDate,
      //image: BASE_URL + event?.Image?.url
      image: imageUrl ? BASE_URL + imageUrl : null 
  }
}

export function generateSignupPayload(formData, eventId) {
  if (!eventId) {
    return {
      data: {...formData, isGeneralInterest: true}
      } 
    }  else {
    return {
      data: {
        ...formData,
        event: {
          // Connect the participant to the event with the provided documentId
          // This will create a relationship between the participant and the event
          connect: [{ documentId: eventId }]  
        }
      }
    }
  }
}

function createEventQuery(eventIdToExclude) {
  const queryObject = {
    pagination: {
      start: 0,
      limit: 12,
    },
    sort: ["startingDate:asc"],
    filters: {
      startingDate: {
        $gt: new Date(),
      },
    },
    populate: {
      image: {
        populate: "*",
      },
    },
  };

  if (eventIdToExclude) {
     queryObject.filters.documentId = { 
      $ne: eventIdToExclude,
    };
  }
  return qs.stringify(queryObject, { encodeValuesOnly: true });
}

  export async function fetchAllEvents(eventIdToExclude = null) {
  const query = createEventQuery(eventIdToExclude);

  const response = await axios.get(`${BASE_URL}/api/events?${query}`);
  return response.data.data.map((event) => processEventData(event));
}
