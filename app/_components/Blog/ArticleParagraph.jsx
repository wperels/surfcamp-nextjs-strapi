import { extractImageUrl, renderParagraphContent } from "@/utils/strapi.utils";
import ReactMarkdown from "react-markdown";


const ArticleParagraph = ({ paragraph }) => {
  return (
    <div className="copy article-paragraph">
 <ReactMarkdown>{renderParagraphContent(paragraph.paragraph)}</ReactMarkdown>
    </div> 

  )
}
export default ArticleParagraph