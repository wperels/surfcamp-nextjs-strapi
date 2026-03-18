import qs from 'qs';

const BASE_URL = process.env.STRAPI_URL || "http://127.0.0.1:1337";

// Helper to check if URL is already complete (Cloudinary or external)
export function getStrapiMediaUrl(url) {
  if (!url) return null;
  
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  return `${BASE_URL}${url}`;
}

export async function fetchDataFromStrapi(route) {
  const url = `${BASE_URL}/api/${route}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    console.log(`Fetching from: ${url}`);
    const response = await fetch(url, {
      next: { revalidate: 300 },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`Status: ${response.status}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    return json.data;
  } catch (err) {
    console.error(`Failed to fetch data from: ${url}`);
    console.error(`Error message: ${err.message}`);
    throw new Error(`Failed to fetch data from: ${url}`);
  }
}

export function processInfoBlocks(data) {
  const infoBlocksRaw = data.info_blocks
  return infoBlocksRaw.map( (infoBlock) => ({
      ...infoBlock.attributes,
      id: infoBlock.id,
      showimageRight: infoBlock.showimageRight,
      imageSrc: getStrapiMediaUrl(infoBlock.image?.formats?.thumbnail?.url),
      headline: infoBlock.headline,
      text: infoBlock.text[0].children[0].text,
      button: createInfoBlockButton(infoBlock.button)
  }))
}

export function createInfoBlockButton(buttonData) {
  if (!buttonData) {
    return null
  }
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
      featuredImage: article.featuredImage?.url ? getStrapiMediaUrl(article.featuredImage.url) : null,
      articleContent: article.articleContent || []
  }
}

function processImageTextComponent(component) {
  return {
    ...component.attributes,
    id: component.id,
    paragraph: component.paragraph,
    imageCaption: component.imageCaption,
    image: getStrapiMediaUrl(component.image?.formats?.thumbnail?.url),
    isLandscape: component.isLandscape,
    imageShowsRight: component.imageShowsRight,
    articleContent: component.articleContent || []
  }
}

export function renderParagraphContent(paragraphArray) {
  if (!paragraphArray || !Array.isArray(paragraphArray)) return '';
  
  return paragraphArray.map((para) => {
    if (para.type === 'paragraph' && para.children) {
      return para.children.map(child => child.text).join('');
    }
    return '';
  }).join('\n\n');
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }; 
  return date.toLocaleDateString('en-US', options);
}

export function extractImageUrl(imageData) {
  if (!imageData || typeof imageData !== 'object') return '';
  const url = imageData.url || imageData.formats?.thumbnail?.url || '';
  return getStrapiMediaUrl(url);
}

export function extractLandscapeImageUrl(imageData) {
  if (!imageData) return '';
  
  if (typeof imageData === 'string') {
    return getStrapiMediaUrl(imageData);
  }
  
  if (typeof imageData === 'object') {
    const url = imageData.url || imageData.image?.[0]?.url;
    return getStrapiMediaUrl(url);
  }
  
  return '';
}

export async function fetchIndividualEvent(documentId) {
  const url = `${BASE_URL}/api/events/${documentId}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(url, {
      next: { revalidate: 300 },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const json = await response.json();
    return processEventData(json.data);
  } catch (err) {
    console.error(`Failed to fetch event ${documentId}:`, err.message);
    throw err;
  }
}

export function processEventData(event) {
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
      image: getStrapiMediaUrl(imageUrl)
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
  const url = `${BASE_URL}/api/events?${query}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(url, {
      next: { revalidate: 300 },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const json = await response.json();
    return json.data.map((event) => processEventData(event));
  } catch (err) {
    console.error(`Failed to fetch events:`, err.message);
    throw err;
  }
}
