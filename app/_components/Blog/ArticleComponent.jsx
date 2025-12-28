const ArticleComponent = ( {component} ) => {
  
console.log("component log",component)
    const ComponentType = component.__component.split("blog-article.")[1]

    switch (ComponentType) {
      case "headline":
        return <h1>Headline</h1>
      case "paragraph-with-image":
        return <h1>Paragraph With Image</h1>
      case "paragraph":
          return <h1>Paragraph</h1>
      case "landscape-image":
        return <h1>Landscape Image</h1>
      default:
        return <h1>Component not found</h1>
    }
}
export default ArticleComponent