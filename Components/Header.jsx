"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Logo from '../pages/assets/media/common/logo2.png';
import Image from 'next/image';
import { RiFacebookFill, RiLinkedinBoxFill } from "react-icons/ri";
import { FaXTwitter, FaWhatsapp } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { AiFillYoutube } from "react-icons/ai";

const Header = () => {
    const [isSticky, setIsSticky] = useState(false);

    const today = new Date().toLocaleDateString('bn-BD', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Collapse navbar on link click (mobile only)
    useEffect(() => {
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        const navbarCollapse = document.getElementById('mainNav');

        const handleClick = () => {
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = window.bootstrap?.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
        };

        navLinks.forEach(link => link.addEventListener('click', handleClick));

        return () => {
            navLinks.forEach(link => link.removeEventListener('click', handleClick));
        };
    }, []);

    return (
        <>
            {/* Top bar */}
            <div className="Dheader">
                <div className="container d-flex justify-content-between align-items-center">
                    <div className="date-time d-flex align-items-center">
                        <span className="text-muted small">{today}</span>
                    </div>
                    <div className="d-flex align-items-center gap-2 form-section">
                        {/* <form className="d-flex" role="search">
              <input className="form-control form-control-sm me-2" type="search" placeholder="search..." />
              <button className="btn btn-outline-secondary btn-sm" type="submit">খুঁজুন</button>
            </form> */}
                        <div className="social-icon">
                            <div className="DSocialLink">
                                <ul>
                                    <li><a href="#" target="_blank"><RiFacebookFill className='icon fa-facebook-f'></RiFacebookFill></a>
                                    </li>
                                    <li><a href="#" target="_blank"><FaXTwitter className='icon fa-x-twitter'></FaXTwitter></a></li>
                                    <li><a href="#" target="_blank"><FaInstagram className='icon fa-instagram'></FaInstagram></a></li>
                                    <li><a href="#" target="_blank"><RiLinkedinBoxFill className='icon fa-linkedin'></RiLinkedinBoxFill></a></li>
                                    <li><a href="#" target="_blank"><AiFillYoutube className='icon fa-youtube '></AiFillYoutube ></a></li>
                                    <li><a href="#" target="_blank"><FaWhatsapp className='icon fa-whatsapp'></FaWhatsapp></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

          
                <div className={isSticky ? "sticky-navbar shadow-sm" : ""}>
                    {/* Logo center */}
                    <div className="menuArea">
                    <a href="/" className='Logo-area'>
                        <Image
                            src={Logo}
                            alt="News Portal.com"
                            title="News Portal.com"
                            className="img-fluid"
                            style={{ width: "270px" }}
                            priority
                        />
                    </a>

                    {/* Navbar */}
                    <nav className="navbar navbar-expand-lg navbar-light bg-white">
                        {/* <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#mainNav"
                            aria-controls="mainNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button> */}


                            <ul className="navbar-nav">
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
                                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                      
                    </nav>

                    
                </div>
            </div>
        </>
    );
};

export default Header;
