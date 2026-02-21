"use client"
//import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const Header = () => {
  const path = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { display: "the camp.", slug: "/" },
    { display: "the experience.", slug: "/experience" },
    { display: "the blog.", slug: "/blog" }
  ];

  return (
    <header className={`header ${path === "/experience" ? "header--light" : ""}`}>
      
      {/* Logo - keep your original <img> */}
      <img 
        className="header__logo" 
        src="/assets/logo.svg" 
        width={200} 
        height={200} 
        alt="Logo" 
      />

      {/* Nav - hidden on mobile, shown on tablet/desktop */}
      <ul className={`header__nav${menuOpen ? ' header__nav--open' : ''}`}>
        {navItems.map((item) => (
          <li key={item.slug}>
            <Link href={`${item.slug}`}>
              <h5>{item.display}</h5>
            </Link>
          </li>
        ))}
      </ul>

      {/* Book Now - hidden on mobile */}
      <Link href="/events">
        <button className="btn btn--black btn--small">Book Now</button>
      </Link>

      {/* Hamburger button - only visible on mobile */}
      <button
        className="header__hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

    </header>
  );
};

export default Header;
