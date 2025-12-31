import { extractImageUrl, renderParagraphContent } from "@/utils/strapi.utils";
import ReactMarkdown from "react-markdown";


const ImageTextComponent = ({ component }) => {
  const { paragraph, imageCaption, image, isLandscape, imageShowsRight } =
    component || {};

  return (
    <div
      className={`article-text-image ${isLandscape ? "" : "article-text-image--portrait"}
      ${imageShowsRight ? "" : "article-text-image--reversed"}`}
    > 
    <div className="copy article-text-image__text article-paragraph">
     <ReactMarkdown>{renderParagraphContent(paragraph)}</ReactMarkdown>
    </div>
      <div className="article-text-image__container">
        {image && (
          <div className="article-text-image__image">
            <img src={extractImageUrl(image)} alt={imageCaption || ''} />
          </div>
        )}
        {imageCaption && (
          <p className="article-text-image__caption copy-small">{imageCaption}</p>
        )}
      </div>
    </div>
  );
};

export default ImageTextComponent;

