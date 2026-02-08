//import axios from "axios";
import HighlightArticle from "../_components/Blog/HighlightArticle";
import SubscribeToNewsletter from "../_components/Blog/SubscribeToNewsletter";
import FeaturedItems from "../_components/FeaturedItems/FeaturedItems";
import {  fetchBlogArticles, formatDate } from "../../utils/strapi.utils"; 
import ArticleIntro from "../_components/Blog/ArticleIntro";


export const revalidate = 3600; // Revalidate every hour
export default async function Page() {
 const data = await fetchBlogArticles();
 //console.log(data) // Check if data is fetched correctly

 // write different queries: first one to find the highlight blog article
    const highlightArticleData = data.find(
    (article) => article.isHighlightArticle
  ); 

// find the articles that are not highlight articles but sorted by publishing date.
  const featuredArticlesData = data.filter(
    (article) => !article.isHighlightArticle
  )


    /* to test fetching featured image  
    console.log(blogData[0].featuredImage)
    console.log("blogData:", blogData) // Check if it's an array
    console.log("blogData length:", blogData?.length) // Check if it has items
    console.log("First item:", blogData?.[0]) // Check the first item structure
    */

    /* fetch the blog articles data from Strapi using the fetchDataFromStrapi function. - moved to strapi.utils.js
        const blogData = await fetchDataFromStrapi("blog-articles?populate=*")
        const processBlogArticles = blogData.map( (article) => 
      ({
          ...article.attributes,
          id: article.id,
          featuredImage: article.featuredImage?.formats?.thumbnail?.url
      })
    ) */

    /* dummy data for testing
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
      }  */ 

    /* dummy data for testing
    const featuredArticlesData2 = [{
      headline: "surfboard shaping and design behind the scenes of crafting the perfect board",
      slug: "/blog/whatever",
      date: "Monday, June 05, 2023",
      featuredImage: "/assets/hero-experience.png"
    }] */

  return (
    
    <main className="blog-page  ">
      {/* The HighliFeaturedItemsghtArticle component is used to display a highlighted article on the blog page.
       It receives the article data as a prop and displays the article's headline, excerpt, and featured image. */}
      <HighlightArticle data={highlightArticleData}/>
        <SubscribeToNewsletter />
        <FeaturedItems items={featuredArticlesData}/>
    </main>
  );
}