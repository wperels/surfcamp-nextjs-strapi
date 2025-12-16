"use client"

import FeaturedArticle from "./FeaturedArticle";
import { useState } from "react";

const FeaturedItems = ( {headline, items} ) => {
  const [itemNumber, setItemNumber] = useState(3)

  const onShowMore = () => {}
  return (
    <section className="fetured-items">
    <h3 className="featured-items__headline">
      {headline || "Our featured articles"}
    </h3>
    <div className="featured-items__container">
      {items.map((item) => (
        <FeaturedArticle key={item.slug} article={item} />
      ))}
    </div>
    <button className="btn btn--medium btn--turquoise" onClick={onShowMore}>See more</button>
    </section>
  )
}


export default FeaturedItems;