import Link from 'next/link';
import Image from 'next/image';

const HeroSection = ({ imgSrc, headline, theme="turquoise" }) => {
  return (
    <section className="hero">
      <div className="hero__background">
        <img src= {imgSrc || "/assets/hero-home.png"} width={700} height={500} alt="Hero"></Image>
      </div>
      <div className= {`hero__headline  hero__headline--${theme}`}>
        {headline || <h1>headline missing </h1>}
      </div>
      <button className={ `btn  btn--medium btn--${theme}` }>
        <Link href="/events">Book Now</Link>
      </button>
        <img className={`hero__logo hero__logo--${theme}`} src= {"/assets/logo.svg"} width={100} height={500} alt="Hero"></Image>
    </section>

  )
}



export default HeroSection