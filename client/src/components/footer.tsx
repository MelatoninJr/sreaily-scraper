import React from "react";

const Footer = () => {
    return (
        <footer className="footer p-10 bg-base-200 text-base-content">
            <nav>
                <header className="footer-title">Services</header>
                <a href="/services/branding" className="link link-hover">Branding</a>
                <a href="/services/design" className="link link-hover">Design</a>
                <a href="/services/marketing" className="link link-hover">Marketing</a>
                <a href="/services/advertisement" className="link link-hover">Advertisement</a>
            </nav>
            <nav>
                <header className="footer-title">Company</header>
                <a href="/company/about-us" className="link link-hover">About us</a>
                <a href="/company/contact" className="link link-hover">Contact</a>
                <a href="/company/jobs" className="link link-hover">Jobs</a>
                <a href="/company/press-kit" className="link link-hover">Press kit</a>
            </nav>
            <nav>
                <header className="footer-title">Legal</header>
                <a href="/legal/terms-of-use" className="link link-hover">Terms of use</a>
                <a href="/legal/privacy-policy" className="link link-hover">Privacy policy</a>
                <a href="/legal/cookie-policy" className="link link-hover">Cookie policy</a>
            </nav>
            <form>
                <header className="footer-title">Newsletter</header>
                <fieldset className="form-control w-80">
                <label className="label">
                    <span className="label-text">Enter your email address</span>
                </label>
                <div className="relative">
                    <input type="email" placeholder="username@site.com" className="input input-bordered w-full pr-16" />
                    <button className="btn btn-primary absolute top-0 right-0 rounded-l-none">Subscribe</button>
                </div>
                </fieldset>
            </form>
        </footer>
    )
}

export default Footer;
