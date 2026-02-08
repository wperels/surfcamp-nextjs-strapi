import ArticleIntro from "@/app/_components/Blog/ArticleIntro";
import {  fetchBlogArticles, fetchDataFromStrapi } from "../../../utils/strapi.utils"; 
import ArticleOverview from "@/app/_components/Blog/ArticleOverview";
import ArticleComponent from "@/app/_components/Blog/ArticleComponent";
import ArticleHeadline from "@/app/_components/Blog/ArticleHeadline"
import FeaturedItems from "@/app/_components/FeaturedItems/FeaturedItems"

export const revalidate = 3600; // Revalidate every hour
export default async function Page({ params }) {
  // the article property is renamed to slug using the ": slug" syntax. 
  // the slug variable will contain the value of "params.article".
  const { article: slug } = await params;
  const articles = await fetchBlogArticles()
  const article = articles.find((article) => article.slug === slug)
  
 /*  <--an array of articles that are not the current article. --> */
  const moreArticles = articles.filter((article) => article.slug !== slug)



 // Handle missing article
  if (!article) {
    return <main>Article not found for slug: {slug}</main>;
  }
/*   const headlines = article.articleContent.filter(
    (component) => component.__component === "blog-article.headline"
  ) */

  return (
    <main>
      <ArticleIntro article={article} />
     <section className="article-section">   
      <ArticleOverview article={article} />
      {article.articleContent.map((component) => (
        <ArticleComponent key={component.id} component={component} />
      ) )}
      <FeaturedItems items={moreArticles} headline={"Explore our other articles"} />
     </section>
    </main>
  );
}


/*The generateStaticParams() function fetches data from Strapi using the fetchDataFromStrapi function  
and maps over the fetched articles to create an array of objects with a single property named article. 
The value of this property is the slug of each article.*/
export async function generateStaticParams() {
  try {
    const articles = await fetchDataFromStrapi("blog-articles");

    return articles.map((article) => ({
      // article: article.attributes.slug,
      // do not use ".attributes" here, it's not necessary
      article: article.slug,
    }));
  } catch (err) {
    console.log("Error fetching slugs for articles", err);
    return []
  }
}

export const revalidate = 300;