import ArticleIntro from "@/app/_components/Blog/ArticleIntro";
import {  fetchBlogArticles, fetchDataFromStrapi } from "../../../utils/strapi.utils"; 
import ArticleOverview from "@/app/_components/Blog/ArticleOverview";
import ArticleComponent from "@/app/_components/Blog/ArticleComponent";


export default async function Page({ params }) {
  // the article property is renamed to slug using the ": slug" syntax. 
  // the slug variable will contain the value of "params.article".
  const { article: slug } = await params;
  const articles = await fetchBlogArticles()
  const article = articles.find((article) => article.slug === slug)
  //console.log('Found article:', article)
 // Handle missing article
  if (!article) {
    return <main>Article not found for slug: {slug}</main>;
  }

  return (
    <main>
      <ArticleIntro article={article} />
     <section className="article-section">   
      <ArticleOverview article={article} />
      {article.articleContent.map((component) => (
        <ArticleComponent key={component.id} component={component} />
      ) )}
     </section>
    </main>
  );
}

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