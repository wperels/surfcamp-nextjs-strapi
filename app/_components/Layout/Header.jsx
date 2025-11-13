"use client"
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const path = usePathname();
  const navItems = [
    {
      display: "the camp.", slug: "/"
    },
    {
      display: "the experience.", slug: "/experience"
    },
    {
      display: "the blog.", slug: "/blog"
    }
  ]
  

  return (
    <header className={`header ${path === "/experience" ? "header--light" : ""}`}>
      <Image className="header__logo" src="/assets/Logo.svg" width={200} height={200} alt="Logo" />
      <ul className="header__nav">
        {navItems.map( (item) => (
       <li key={item.slug}>
         <Link href={`${item.slug}`}>
         <h5>{item.display}</h5>
         </Link>
       </li>

        ))}
      </ul>
      <Link href="/events">
      <button className="btn btn--black btn--small">Book Now</button>
      </Link>
  </header>
  )
}

export default Header