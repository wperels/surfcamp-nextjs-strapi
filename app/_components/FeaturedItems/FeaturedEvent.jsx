import Link from "next/link";
import { formatDate } from "../../../utils/strapi.utils"; 

const FeaturedEvent = ({ event }) => {
  //console.log("event:", event)
  return (
 <Link 
    //href={`/blog/${event.slug}`}
    href={`/events/${event.documentId}`} 
    className="featured-items__article" >
      <div className="featured-items__article-img">
      <img src={event.image} alt={event.name || ""} />
      </div>

      <div className="featured-items__article-text featured-items__article-text--event">
        <h5>{event.name}</h5>
        <p className="copy-small bold">{formatDate(event.startingDate)}</p>
        <p className="copy-small">Prices starting at €{event.sharedPrice} per person</p>

      </div>
 </Link> 
)
}

export default FeaturedEvent;