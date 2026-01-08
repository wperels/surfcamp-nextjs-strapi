import {  fetchBlogArticles } from "../../../../utils/strapi.utils"; 
import BlogPreviewItem from "@/app/_components/Blog/BlogPreview/BlogPreviewItem"


const BlogPreview = async () => {
    const data = await fetchBlogArticles()
    const highlightArticle = data.find( (article) => article.isHighlightArticle)
    const recentlyPublishedArticles = data
        .filter( (article) => !article.isHighlightArticle)
        .slice(0, 3)
        // a new array named articlesToDisplay combining the highlightArticle and the recentlyPublishedArticles arrays.
    const articlesToDisplay = [highlightArticle, ...recentlyPublishedArticles]

console.log("articlesToDisplay:",articlesToDisplay)
return (
    <div className="blog-preview">
      <h2 className="blog-preview__headline">the blog</h2>
      <div className="blog-preview__container">
        {articlesToDisplay.map((article) => (
        <BlogPreviewItem key={article.id} article={article} headline={article.headline} />
        ))}
      </div>
    </div>
  )
}

export default BlogPreview