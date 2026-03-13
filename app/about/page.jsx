import Image from 'next/image';

export const metadata = {
  title: 'About | Wendy Perelstein',
};

export default function AboutPage() {
  return (
    <main className="static-page">

      <div className="static-page__hero">
       
        <div className="static-page__hero-image">
          <Image
            src="/assets/wp-with-pluto.jpg"
            alt="Wendy Perelstein with Pluto"
            width={175}  // ← was 400
            height={175}  // ← was 300
            style={{ objectFit: 'cover', borderRadius: '8px' }}
          />
        </div>
         <h1>The Developer</h1>
      </div>

      <p>
        I'm Wendy Perelstein, full-stack developer and a data engineer/analyst based in
        Colorado Springs. I currently work at Space Foundation, where I manage a payload database
        (researching satellites), work with WordPress, and craft SEO for space content.
      </p>

      <p>
        On the development side, I work primarily with Next.js and Strapi to
        build responsive, content-driven web applications. I enjoy solving
        layout problems, connecting APIs, and making data actually readable for
        people who need it.
      </p>

      <p>
        When I'm not writing code, you'll find me strength training, following
        NASA missions, or throwing pots on a potter's wheel with the same energy I
        bring to learning new software tools.
      </p>

      <p>
        <a href="mailto:Wendy.Perelstein@gmail.com">Get in touch →</a>
      </p>

    </main>
  );
}
