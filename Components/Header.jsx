"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Logo from "../pages/assets/media/common/logo2.png";
import Image from "next/image";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);

  const today = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top bar */}
      <div className="Dheader py-2 bg-light border-bottom">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="date-time text-muted small">{today}</div>
          <div className="form-section">
            <form className="d-flex" role="search">
              <input
                className="form-control form-control-sm me-2"
                type="search"
                placeholder="search..."
              />
              <button
                className="btn btn-outline-secondary btn-sm"
                type="submit"
              >
                খুঁজুন
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Sticky Navbar */}
      <div className={isSticky ? "sticky-navbar shadow-sm" : ""}>
        <div className="container py-2">
          {/* Logo */}
          <div className="d-flex justify-content-center">
            <a href="/" className="Logo-area d-block">
              <Image
                src={Logo}
                alt="News Portal.com"
                title="News Portal.com"
                className="img-fluid"
                style={{ width: "270px" }}
                priority
              />
            </a>
          </div>
        </div>

        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-white border-top border-bottom">
          <div className="container">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#mainNav"
              aria-controls="mainNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="mainNav">
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                {[
                  { path: "/national", label: "জাতীয়" },
                  { path: "/international", label: "আন্তর্জাতিক" },
                  { path: "/sports", label: "খেলাধুলা" },
                  { path: "/finance-and-trade", label: "অর্থ-বাণিজ্য" },
                  { path: "/entertainment", label: "বিনোদন" },
                  { path: "/feature", label: "ফিচার" },
                  { path: "/education", label: "শিক্ষা" },
                  { path: "/lifestyle", label: "লাইফস্টাইল" },
                  { path: "/archieves", label: "আর্কাইভ" },
                ].map((item, idx) => (
                  <li className="nav-item" key={idx}>
                    <Link
                      className="nav-link"
                      href={item.path}
                      prefetch={false}
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
