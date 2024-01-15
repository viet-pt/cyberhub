import Link from "next/link";
import React from "react";

const Footer = () => {

  return (
    <footer className="bg-primary-gray py-8 md:py-10 mt-12">
      <h3
        className="text-center text-lg md:text-2xl medium font-apoc font-bold"
        style={{ color: "#223364" }}
      >
        CyberHub
      </h3>
      <div className="container mx-auto font-apoc mt-12 mobile:px-5">
        <div className="border-b border-solid border-second-gray flex-between pb-3">
          <p className="text-xl lg:text-3xl mb-0 font-apoc font-bold">
            Contact
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start justify-between pb-5 pt-5 lg:space-x-5">
          <div className="text-base lg:text-2xl">
            <p className="mb-4">Nguyễn Hữu Cường</p>
            <p className="mb-4">012 3456 789</p>
          </div>
          
          <div className="uppercase lg:text-right text-xs lg:text-13 grid grid-cols-1">
            <Link href="/" className="mb-2">Privacy</Link>
            <Link href="/" className="mb-2">Useful Information</Link>
            <Link href="/" className="mb-2">Careers</Link>
            <Link href="/" className="mb-2">Privacy Policy</Link>
            <Link href="/" className="mb-2">Terms and Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
