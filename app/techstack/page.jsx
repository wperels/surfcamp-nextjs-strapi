import Image from 'next/image';

export const metadata = {
  title: 'Tech Stack | Wendy Perelstein',
};

export default function TechStackPage() {
  return (
    <main className="static-page">
      <div className="static-page__banner">
        <Image
          src="/assets/mars-header-strip.jpg"
          alt="Mars surface landscape"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
        />
      </div>

      <div className="static-page__content">
      <h1>Tech Stack</h1>

      <section>
        <h2>Frontend</h2>
        <ul>
          <li>Next.js (App Router)</li>
          <li>React / JSX</li>
          <li>SCSS / CSS Modules</li>
          <li>Responsive design & mobile-first layouts</li>
        </ul>
      </section>

      <section>
        <h2>Backend & CMS</h2>
        <ul>
          <li>Strapi v5 (headless CMS)</li>
          <li>REST API integration</li>
          <li>PostgreSQL</li>
          <li>Cloudinary (media management)</li>
        </ul>
      </section>

     {/*  <section>
        <h2>Data & BI</h2>
        <ul>
          <li>SQL</li>
          <li>Power BI</li>
          <li>Snowflake (learning)</li>
        </ul>
      </section> */}

      <section>
        <h2>DevOps & Tooling</h2>
        <ul>
          <li>Git / GitHub</li>
          <li>Vercel (frontend deployment)</li>
          <li>Render (backend hosting)</li>
          <li>Chrome DevTools</li>
          <li>VS Code</li>
        </ul>
      </section>
      </div>
    </main>
  );
}
