import React from "react";
import logo from "@../../../public/image/logo.png";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="footer mt-12 p-10 bg-base-200 text-base-content">
      <div>
        <h2 className="text-lg font-bold">Kanban</h2>
        {/* <Image src={logo} /> */}
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque
          cupiditate laborum fuga hic. Minima sint, eos necessitatibus, nostrum
          porro laudantium consequatur, odio alias ratione possimus dignissimos
          placeat rerum fugit aliquid?
        </p>
      </div>
      <nav>
        <h6 className="footer-title">Services</h6>
        <a className="link link-hover">Branding</a>
        <a className="link link-hover">Design</a>
        <a className="link link-hover">Marketing</a>
        <a className="link link-hover">Advertisement</a>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </nav>
      <nav>
        <h6 className="footer-title">Legal</h6>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </nav>
    </footer>
  );
};

export default Footer;
