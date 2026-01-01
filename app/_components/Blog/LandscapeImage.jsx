import { extractLandscapeImageUrl } from "@/utils/strapi.utils"

const LandscapeImage = ({ imageData }) => {
  const { image, imageCaption } = imageData;
  const imageUrl = image?.[0]?.url;
 // console.log("LandscapeImage:", image?.[0]?.url)
// console.log("ImageData:", imageData)
 
  
  return (
    
    <div>
        {image && (
          <div className="article-image">
            <img src={extractLandscapeImageUrl(imageUrl)} alt={imageCaption || ''} />
            {imageCaption && <p className="copy article-image__caption copy-small">
              {imageCaption}</p>}
          </div>
        )}
    </div>
  );
};
export default LandscapeImage

