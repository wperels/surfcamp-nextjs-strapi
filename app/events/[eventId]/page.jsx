import SignupForm from "@/app/_components/Events/SignupForm";
import {  fetchDataFromStrapi, fetchIndividualEvent, renderParagraphContent, processEventData } from "../../../utils/strapi.utils"; 
import ReactMarkdown from "react-markdown";


export default async function Page({ params }) {
  const { eventId }  = await params
  const event = await fetchIndividualEvent(eventId)

 const processedDescription = renderParagraphContent(event.description)
   const descriptionMarkdown = (
    <div className="copy">
    <ReactMarkdown>{processedDescription}</ReactMarkdown>
    </div>
  );

 const pricing = {
    singlePrice: event.singlePrice,
    sharedPrice: event.sharedPrice

  }
  
  //console.log("Events:", event)  // This will show all eventIds
  console.log(descriptionMarkdown) // This will show the processed paragraphs
  
  return (
    <main className="events-page">
      <SignupForm headline={event.name} 
      infoText={descriptionMarkdown} 
      buttonLabel="Sign Up"
      pricing={pricing}/>
    </main>
  );
}

//generate the static paths for the dynamic route /events/[eventId]
//create an array of objects with a single property named eventId,
//which is set to the documentId of each event.
export async function generateStaticParams() {
   
  try {
    const events = await fetchDataFromStrapi("events")
    const slugs = events.map((event) => ({
      eventId: event.documentId,
    }))
      //console.log("Generated slugs:", slugs)  // This will show all eventIds
      return slugs
  } catch (err) {
    console.log("Error fetching slugs for events", err);
    return []
  }
}