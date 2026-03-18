const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://wp-nextjs-strapi-backend.onrender.com';
const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 15000; // 15 seconds between retries

async function waitForStrapi(attempt = 1) {
  console.log(`Pinging Strapi... attempt ${attempt} of ${MAX_RETRIES}`);
  try {
    const res = await fetch(`${STRAPI_URL}/api/blog-articles`);
    if (res.ok) {
      console.log('✅ Strapi is awake and responding!');
      return;
    }
    throw new Error(`Status: ${res.status}`);
  } catch (err) {
    console.warn(`⚠️  Strapi not ready: ${err.message}`);
    if (attempt < MAX_RETRIES) {
      console.log(`Waiting ${RETRY_DELAY_MS / 1000}s before retry...`);
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
      await waitForStrapi(attempt + 1);
    } else {
      console.error('❌ Strapi did not respond after max retries. Build may fail.');
      process.exit(1); // fail the build if Strapi never wakes
    }
  }
}

waitForStrapi();
