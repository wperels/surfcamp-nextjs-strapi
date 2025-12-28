import Link from "next/link";
import {  fetchBlogArticles, fetchDataFromStrapi, formatDate } from "../../../utils/strapi.utils"; 


const ArticleOverview = ({ article }) => {
  //console.log('Props received:', article); // Check what you're getting
    const headline = article.articleContent.filter(
    (component) => component.__component === "blog-article.headline"
    )
  //console.log('Headline2:', headline[2]); // Access array element with bracket notation
  //console.log(headline.length);
  return (
    <div className="article-overview">
      <div className="article-overview__info">
        <h3 className="article-overview__headline">{article.headline}</h3>
          <h5 className="article-overview__excerpt">{article.excerpt}</h5>
      </div>
      <ul className="article-overview__contents">
       { headline.map( (headline, index) => (
        <li key={headline.id}>
            <Link href={`#${headline.slug}`}>
          {index + 1}. {headline.headline}
          </Link>
        </li>
       ))}
      </ul>
    </div>
  );
}
export default ArticleOverview