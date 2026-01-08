# Surfcamp Frontend Setup Notes

## Strapi API Configuration

### Working Populate Query
The following query successfully populates both nested dynamic zone relations and top-level image relations:

```
blog-articles?populate[articleContent][populate]=*&populate=featuredImage
```

**Key Points:**
- `populate[articleContent][populate]=*` - Populates ALL relations within the dynamic zone components (including `image` fields)
- `populate=featuredImage` - Populates the top-level featured image relation
- Without nested populate, image fields inside dynamic zones won't be included

### Data Structures

#### paragraph-with-image Component
```js
{
  __component: 'blog-article.paragraph-with-image',
  id: 49,
  paragraph: [
    {
      type: 'paragraph',
      children: [
        { type: 'text', text: '...' }
      ]
    }
  ],
  isLandscape: false,
  imageShowsRight: false,
  imageCaption: 'Caption text',
  image: {
    id: 14,
    documentId: '...',
    name: 'filename.png',
    url: '/uploads/filename.png',
    formats: {
      thumbnail: { url: '/uploads/thumbnail_filename.png' },
      small: { url: '/uploads/small_filename.png' }
    }
  }
}
```

**Image Access:** `image.url` or `image.formats.thumbnail.url`

#### landscape-image Component
```js
{
  __component: 'blog-article.landscape-image',
  id: 36,
  imageCaption: 'Caption text',
  image: [
    {
      id: 16,
      url: '/uploads/filename.png',
      formats: { ... }
    }
  ]
}
```

**Image Access:** `image[0].url` (note: image is an array)

#### featuredImage (Top-level)
Direct object with url property:
```js
{
  url: '/uploads/filename.png',
  formats: { ... }
}
```

## Utility Functions

### renderParagraphContent()
Converts Strapi paragraph data structure to markdown string for ReactMarkdown:

```js
export function renderParagraphContent(paragraphArray) {
  if (!paragraphArray || !Array.isArray(paragraphArray)) return '';
  
  return paragraphArray.map((para) => {
    if (para.type === 'paragraph' && para.children) {
      return para.children.map(child => child.text).join('');
    }
    return '';
  }).join('\n\n');
}
```

### extractImageUrl()
Handles multiple image data formats and prepends BASE_URL:

```js
export function extractImageUrl(imageData) {
  if (!imageData) return '';
  
  // If imageData is already a string (URL path), prepend BASE_URL
  if (typeof imageData === 'string') {
    return imageData.startsWith('http') ? imageData : BASE_URL + imageData;
  }
  
  // If imageData is an object, extract the URL
  if (typeof imageData === 'object') {
    const url = imageData.url || imageData.formats?.thumbnail?.url;
    return url ? BASE_URL + url : '';
  }
  
  return '';
}
```

## Component Examples

### ImageTextComponent (paragraph-with-image)
```jsx
import { extractImageUrl, renderParagraphContent } from "@/utils/strapi.utils";
import ReactMarkdown from "react-markdown";

const ImageTextComponent = ({ component }) => {
  const { paragraph, imageCaption, image, isLandscape, imageShowsRight } =
    component || {};

  return (
    <div className="article-text-image">
      <ReactMarkdown className="copy article-text-image__text article-paragraph">
        {renderParagraphContent(paragraph)}
      </ReactMarkdown>
      <div className="article-text-image__container">
        {image && (
          <div className="article-text-image__image">
            <img src={extractImageUrl(image)} alt={imageCaption || ''} />
          </div>
        )}
        {imageCaption && (
          <p className="article-text-image__caption copy-small">{imageCaption}</p>
        )}
      </div>
    </div>
  );
};

export default ImageTextComponent;
```

### LandscapeImage (landscape-image)
```jsx
const LandscapeImage = ({ imageData }) => {
  const { image, imageCaption } = imageData;
  const imageUrl = image?.[0]?.url;  // Note: image is an array
  
  return (
    <div>
      {image && (
        <div className="article-image">
          <img src={extractImageUrl(imageUrl)} alt={imageCaption || ''} />
          {imageCaption && <p className="copy article-image__caption copy-small">
            {imageCaption}</p>}
        </div>
      )}
    </div>
  );
};

export default LandscapeImage;
```

## Common Issues & Solutions

### Issue: Image not displaying (undefined)
**Cause:** Strapi populate query not including nested relations
**Solution:** Use `populate[articleContent][populate]=*` in the API query

### Issue: "Cannot read properties of undefined (reading 'formats')"
**Cause:** Image data is undefined or null
**Solution:** Add null checks in `extractImageUrl()` and use optional chaining (`?.`)

### Issue: "Unexpected value `[object Object]` for `children` prop"
**Cause:** Trying to pass JSX elements to ReactMarkdown which expects a string
**Solution:** Convert paragraph data to string using `renderParagraphContent()` first

### Issue: Empty src attribute in image tag
**Cause:** Image URL is already a full path but being processed again
**Solution:** Check if URL is already a string and handle accordingly in `extractImageUrl()`

## Testing
When testing image loading:
1. Check the raw API response: `http://127.0.0.1:1337/api/blog-articles?populate[articleContent][populate]=*&populate=featuredImage`
2. Verify image property exists and has correct structure
3. Use console.log to inspect data structure before rendering
4. Ensure BASE_URL is correctly set in environment variables
