import axios from 'axios';
import Link from 'next/link';


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

function createInfoBlockButton(buttonData) {
  if (!buttonData) {
    return null
  }
      /*  { Link element moved to InfoBlock.js } 
      return (
          <Link href={`/${buttonData.slug}`} className= {`btn btn-medium btn--${buttonData.color}`}
          >{buttonData.text}</Link>
      ) */
   return {
    text: buttonData.text,
    slug: buttonData.slug,
    color: buttonData.color
  }
}

export { createInfoBlockButton };