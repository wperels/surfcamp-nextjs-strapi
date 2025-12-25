"use client"

import FeaturedArticle from "./FeaturedArticle";
import { useState } from "react";

const FeaturedItems = ( {headline, items} ) => {
  const [itemNumber, setItemNumber] = useState(3)

// determine the number of items to display in a featured articles section
// updates the state using the setItemNumber function
  const onShowMore = () => {
    // itemNumber should never exceed the number of items in the items array
    if (itemNumber + 3 > items.length) {
      return setItemNumber(items.length)
    } else {
      return setItemNumber(itemNumber + 3)
    }
  }
  return (
    <section className="fetured-items">
    <h3 className="featured-items__headline">
      {headline || "Our featured articles"}
    </h3>
    <div className="featured-items__container">
      {items.slice(0, itemNumber).map((item) => (
        <FeaturedArticle key={item.slug} article={item} />
      ))}
    </div>
    { itemNumber < items.length && (
      <button className="btn btn--medium btn--turquoise" onClick={onShowMore}>
        See more</button>)}
    </section>
  )
}


export default FeaturedItems;