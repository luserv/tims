'use client';
import React from 'react';
import { useState } from "react";
import IconPhone  from "@/components/icons/icon-phone.svg";
import IconEmail from '@/components/icons/icon-email.svg';
import IconFb  from '@/components/icons/social-netwoks/icon-fb.svg';
import IconTw from '@/components/icons/social-netwoks/icon-tw.svg';
import IconInsta from '@/components/icons/social-netwoks/icon-instagram.svg';


const socialIconStyles = `
  w-10 h-10 fill-white text-white hover:fill-[hsl(224,93%,58%)]
  cursor-pointer transition-all duration-300
  rounded-full border border-white hover:border-[hsl(224,93%,58%)] p-2
`;


const Footer: React.FC = () => {

    const [footeremail, setFooterEmail] = useState("");
    const [footerror, setFooterError] = useState("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const footerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!footeremail) {
      setFooterError("Please enter your email address.");
    } else if (!emailRegex.test(footeremail)) {
      setFooterError("Please check your email");
    } else {
      setFooterError("");
      // Aquí puedes continuar con el submit real
      console.log("Email submitted:", footeremail);
    }
  };

    return (
        <footer className="bg-[#001b55] text-white pb-16 m-auto w-screen">
        <div className=" mx-auto pre-footer flex flex-col items-center justify-between px-6 py-20 text-center bg-acent md:flex-row md:px-26 md:py-30 md:grid md:grid-cols-2 md:gap-8">
          <div className="info mb-8 md:mb-0 md:text-left md:max-w-[600px]">
            <h2 className="text-2xl font-bold mb-4 md:text-4xl">Get early access today</h2>
            <p className="text-gray-200 md:text-xl">
              It only takes a minute to sign up and our free starter tier is extremely generous. 
              If you have any questions, our support team would be happy to help you.
            </p>
          </div>
          <form 
            className="mail flex flex-col gap-3 w-full px-6 "
            onSubmit={footerSubmit}
            noValidate
            >
            <input
              type="email"
              placeholder="email@example.com"
              value={footeremail}
              onChange={(e) => setFooterEmail(e.target.value)}
              className={`border ${footerror ? 'border-red-500' : 'border-gray-300'} px-5 py-2 rounded-lg text-black bg-white md:max-w-[900px] md:py-6`}
            />
            {footerror && (
        <span className="text-white text-sm mt-0 md:text-left">{footerror}</span>
      )}
            <button type="submit" 
            className="bg-blue-600 text-white py-2 rounded-lg font-semibold transition hover:bg-blue-400 hover:cursor-pointer md:max-w-[300px] md:py-6">
              Get Started For Free
            </button>
            
          </form>
        </div>



        <div className="main-footer mx-auto mt-16 grid grid-cols-1 md:grid-cols-4 gap-8 px-6 md:px-26 md:py-15">
          <div  className="flex flex-col items-start">
            
            

            <span className="mb-6 flex flex-row gap-2 hover:text-[hsl(224,93%,58%)]  cursor-pointer">
              <IconPhone className="w-6 h-4 fill-white hover:fill-[hsl(224,93%,58%)]" /> +593 978764482
            </span>
            <span className="flex flex-row gap-2 hover:text-[hsl(224,93%,58%)] cursor-pointer">
              <IconEmail className="w-6 h-4 fill-white hover:fill-[hsl(224,93%,58%)]" />
              informaciontecnologias2020@gmail.com
            </span>
          </div>

          <div className="flex flex-col gap-y-6 items-start md:mt-28">
            <span className="hover:text-[hsl(224,93%,58%)] cursor-pointer">About Us</span>
            <span className="block hover:text-[hsl(224,93%,58%)] cursor-pointer">Blog</span>
          </div>
          

          <div className="flex justify-center space-x-4 md:mt-28 md:justify-start">

            <a href="https://www.facebook.com/TIespochMorona" target="_blank" rel="noopener noreferrer"><IconFb className={socialIconStyles} /></a>
            <a href="https://www.instagram.com/tiespochmorona" target="_blank" rel="noopener noreferrer"><IconInsta className={socialIconStyles} /></a>
            

            

            

          </div>

        </div>

      </footer>
    );
};

export default Footer;