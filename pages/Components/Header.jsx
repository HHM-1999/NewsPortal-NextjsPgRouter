"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Logo from '../assets/media/common/logo2.png'
import Image from 'next/image';

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


    return (
        <>
            {/* Top bar */}
            <div className="Dheader">
                <div className="container d-flex justify-content-between align-items-center">
                    <div className="date-time d-flex align-items-center">
                        {/* <i className="bi bi-list fs-4 me-3"></i> */}
                        <span className="text-muted small">{today}</span>
                        {/* <i className="bi bi-brightness-high ms-2 text-muted fs-5"></i> */}
                    </div>
                    <div className="d-flex align-items-center gap-2 form-section">
                        <form className="d-flex" role="search">
                            <input className="form-control form-control-sm me-2" type="search" placeholder="search..." />
                            <button className="btn btn-outline-secondary btn-sm" type="submit">খুঁজুন</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className={isSticky ? "sticky-navbar shadow-sm" : ""}>
                {/* Logo center */}
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
                {/* <div className="row">
                <div className="col-lg-12"> */}

                <nav className="navbar navbar-expand-lg navbar-light bg-white">
                    {/* <div className="container"> */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="mainNav">
                        <ul className="navbar-nav">
                            {[
                                { path: "/national", label: "জাতীয়", },
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


                    </div>
                </nav>
            </div>

        </>
    );
};

export default Header;
