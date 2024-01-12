import Link from "next/link";
import React from "react";

const Footer = () => {

  return (
    <footer className="bg-primary-gray py-8 md:py-10">
      <h3
        className="text-center text-lg md:text-2xl medium"
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
            UK 012 3456 789
          </div>
          
          <div className="uppercase lg:text-right text-xs lg:text-13">
            <Link href="/privacy">Privacy</Link>
            <br />
            <Link href="/information">Useful Information</Link>
            <br />
            <Link href="/careers">Careers</Link>
            <br />
            <Link href="/privacy">Privacy Policy</Link>
            <br />
            <Link href="/terms">Terms and Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
