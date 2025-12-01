import axios from 'axios';
import HeroSection from './_components/HeroSection'
import InfoBlock from './_components/InfoBlock'
import { fetchDataFromStrapi, processInfoBlocks } from '../utils/strapi.utils';


export default async function Home() {
  const data = await fetchDataFromStrapi("Infoblocks-landing2?populate[info_blocks][populate][0]=button&populate[info_blocks][populate][1]=image")
  // (see strapi.utils.js)
  //const responseFetch = await fetch('http://localhost:1337/api/Infoblocks-landing2?populate[info_blocks][populate][0]=button&populate[info_blocks][populate][1]=image')
  //const response = await axios.get('http://127.0.0.1:1337/api/Infoblocks-landing2?populate[info_blocks][populate][0]=button&populate[info_blocks][populate][1]=image')
   
  const InfoblockData = processInfoBlocks(data)

    /* const infoBlocksRaw = data.info_blocks
    console.log(infoBlocksRaw.map( (infoBlock) => {

    {/* return statement moved to strapi.utils.js }
    return {
      ...infoBlock.attributes,
      id: infoBlock.id,
      showimageRight: infoBlock.showimageRight,
      imageSrc: Infoblock.image?.formats?.thumbnail?.url,
      headline: Infoblock.headline,
      text: Infoblock.text[0].children[0].text,
      button: Infoblock.button
    }})) 
    */

 const heroHeadline = (    
  <>
    <h1>barrel.</h1>
    <h1>your.</h1>
    <h1>happiness.</h1>
    </>
    )
    
      /* not needed after fetching from Strapi 
        const InfoblockData = {
        headline: "the experience.",
        text: (<p className="copy">At Sam’s Surfcamp, we invite you to embark on an unforgettable surfing adventure. Nestled in the heart of [Location] our surf camp offers an exhilarating experience for beginners, intermediate surfers, and seasoned wave riders alike.
        Dive into the world of surfing with our expert instructors who have years of experience and a deep passion for the sport. Whether you're a first-time surfer looking to catch your first wave or a seasoned pro seeking to enhance your skills, our dedicated team is here to guide you every step of the way.
        Immerse yourself in the natural beauty of our surf camp's surroundings. Picture yourself waking up to the sound of crashing waves and feeling the warm sand beneath your feet. With pristine beaches and a vibrant coastal atmosphere, [Location] sets the perfect stage for your surf adventure.</p>
        ),
        button: <button className="btn btn--medium btn--turquoise">Book Now</button>,
        reversed: false} 
        */

  return (
    <main>
           <HeroSection headline={heroHeadline} />
           {InfoblockData.map( (data) => <InfoBlock key={data.id} data={data}/>)}
            {/* <Infoblock data={InfoblockData}/>
              <Infoblock data={{...InfoblockData, reversed: true}}/>
            */}
    </main>
  )
}

export const revalidate = 300