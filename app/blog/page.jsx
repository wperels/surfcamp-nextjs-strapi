//import axios from "axios";
import HighlightArticle from "../_components/Blog/HighlightArticle";
import SubscribeToNewsletter from "../_components/Blog/SubscribeToNewsletter";
import FeaturedItems from "../_components/FeaturedItems/FeaturedItems";
import {  fetchBlogArticles } from "../../utils/strapi.utils"; 

export default async function Page() {
 const data = await fetchBlogArticles();
 // write different queries: first one to find the highlight blog article
 // find the articles that are not highlight articles but sorted by publishing date.
console.log(data) 
  
   const highlightArticleData = data.find(
    (article) => article.isHighlightArticle
  ); 

  const featuredArticleData = data.filter(
    (article) => !article.isHighlightArticle
  )


/* to test fetching featured image  
console.log(blogData[0].featuredImage)
console.log("blogData:", blogData) // Check if it's an array
console.log("blogData length:", blogData?.length) // Check if it has items
console.log("First item:", blogData?.[0]) // Check the first item structure
 */

/* moved to strapi.utils.js
const blogData = await fetchDataFromStrapi("blog-articles?populate=*")
blogData.map( (article) => 
  ({
      ...article.attributes,
      id: article.id,
      featuredImage: article.featuredImage?.formats?.thumbnail?.url
  })
) */

  const highlightArticleData2 = {
      headline: "3 tips for a super fast takeoff",
      excerpt: (
        <>
          Improving your take-off phase in surfing is a fundamental step toward riding waves with more confidence and style.

          Improving your take-off phase is a gradual process, and it may take time to master. Be patient, stay committed to practice, 
          and enjoy the journey of becoming a better surfer. With dedication and persistence, you'll see progress and have more enjoyable rides. Here is how:
        </>
      ),
      slug: "takeoff",
      featuredImage: "/assets/blog-3tips.png"
  }  

const featuredArticleData2 = [{
  headline: "surfboard shaping and design behind the scenes of crafting the perfect board",
  slug: "/blog/whatever",
  date: "Monday, June 05, 2023",
  featuredImage: "/assets/hero-experience.png"
},
{
  headline: "surfboard shaping and design behind the scenes of crafting the perfect board surfboard shaping and design behind the scenes of crafting the perfect board",
  slug: "/blog/whatever2",
  date: "Monday, June 05, 2023",
  featuredImage: "/assets/hero-experience.png"
},
{
  headline: "surfboard shaping and design behind the scenes of crafting the perfect board",
  slug: "/blog/whatever3",
  date: "Monday, June 05, 2023",
  featuredImage: "/assets/hero-experience.png"
},{
  headline: "surfboard shaping and design behind the scenes of crafting the perfect board",
  slug: "/blog/whatever4",
  date: "Monday, June 05, 2023",
  featuredImage: "/assets/hero-experience.png"
},{
  headline: "surfboard shaping and design behind the scenes of crafting the perfect board",
  slug: "/blog/whatever5",
  date: "Monday, June 05, 2023",
  featuredImage: "/assets/hero-experience.png"
},{
  headline: "surfboard shaping and design behind the scenes of crafting the perfect board",
  slug: "/blog/whatever6",
  date: "Monday, June 05, 2023",
  featuredImage: "/assets/hero-experience.png"
}] 

  return (
    
    <main className="blog-page  ">
      {/* The HighliFeaturedItemsghtArticle component is used to display a highlighted article on the blog page.
       It receives the article data as a prop and displays the article's headline, excerpt, and featured image. */}
      <HighlightArticle data={highlightArticleData}/>
        <SubscribeToNewsletter />
        <FeaturedItems items={featuredArticleData}/>
    </main>
  );
}