import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black py-6 px-4 sm:px-6 lg:px-8 font-poppins  bottom-0 left-0 w-full z-50">
      ;
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-between gap-y-12 lg:gap-x-8">
          {/* Logo + Description */}

          {/* Important Links */}
          <div className="w-full md:w-[45%] lg:w-[15%] flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-sm text-white font-medium">Important Links</h3>
            <div className="flex flex-col gap-2 mt-3">
              {["Home", "About", "Portfolio", "Contact"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-sm text-white/60 hover:text-white transition"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="w-full md:w-[45%] lg:w-[15%] flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-sm text-white font-medium">Social Links</h3>
            <div className="flex flex-col gap-2 mt-3">
              {["Twitter", "Instagram", "Youtube", "LinkedIn"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-sm text-white/60 hover:text-white transition"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Subscribe */}
          <div className="w-full md:w-[45%] lg:w-[25%] flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-sm text-white font-medium">
              Subscribe for news
            </h3>

            <div className="flex items-center gap-2 border border-white/20 h-13 max-w-80 w-full rounded-full overflow-hidden mt-4">
              <input
                type="email"
                placeholder="Enter your email.."
                className="w-full h-full pl-6 outline-none text-sm bg-transparent text-white placeholder-white/60"
              />
              <button className="bg-linear-to-b from-[#5623D8] to-[#7B53E2] active:scale-95 transition w-56 h-10 rounded-full text-sm text-white mr-1.5">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px mt-5 mb-4 bg-linear-to-r from-black via-white/25 to-black" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/60">© 2026</p>

          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-white/60 hover:text-white">
              Terms & Conditions
            </a>
            <span className="w-px h-4 bg-white/20" />
            <a href="#" className="text-xs text-white/60 hover:text-white">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
