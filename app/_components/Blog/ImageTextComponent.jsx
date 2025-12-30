import { extractImageUrl } from "@/utils/strapi.utils";

const ImageTextComponent = ({ component }) => {
  const { paragraph, imageCaption, image, isLandscape, imageShowsRight } =
    component || {};

  // Helper function to render paragraph content
  const renderParagraphContent = (paragraphArray) => {
    if (!paragraphArray || !Array.isArray(paragraphArray)) return null;
    
    return paragraphArray.map((para, index) => {
      if (para.type === 'paragraph' && para.children) {
        return (
          <p key={index} className="copy article-text-image__text article-paragraph">
            {para.children.map((child, childIndex) => (
              <span key={childIndex}>{child.text}</span>
            ))}
          </p>
        );
      }
      return null;
    });
  };

  return (
    <div className="article-text-image">
      {renderParagraphContent(paragraph)}
      {image && (
        <div className="article-text-image__image">
          <img src={extractImageUrl(image)} alt={imageCaption || ''} />
        </div>
      )}
      {imageCaption && <p className="caption">{imageCaption}</p>}
    </div>
  );
};

export default ImageTextComponent;
