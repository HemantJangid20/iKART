// import React, { useState } from "react";
// import { appleImg, bagImg, githubImg, searchImg } from "../assets";
// import { navLists, sourceCode } from "../constants";

// const Navbar = () => {
//   const [showSearch, setShowSearch] = useState(false);
//   const [query, setQuery] = useState("");

//   const toggleSearch = () => {
//     setShowSearch((prev) => !prev);
//   };

//   return (
//     <>
//       <header className="flex w-full items-center justify-between p-5 sm:px-10">
//         <nav className="screen-max-width flex w-full items-center justify-between gap-4">
//           {/* Apple Logo */}
//           <a href="#">
//             <img src={appleImg} alt="Apple" width={14} height={18} />
//           </a>

//           {/* Nav List */}
//           <div className="flex flex-1 justify-center max-sm:hidden">
//             {navLists.map((nav) => (
//               <a
//                 key={nav}
//                 href="https://www.apple.com/store"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-gray cursor-pointer px-5 text-sm transition-all hover:text-white"
//               >
//                 {nav}
//               </a>
//             ))}
//           </div>

//           {/* Search Icon and Input */}
//           <div className="flex items-center gap-4 max-sm:flex-1 max-sm:justify-end">
//             <div className="relative">
//             {/* <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40"></div> */}
//               <img
//                 src={searchImg}
//                 alt="Search"
//                 width={18}
//                 height={18}
//                 className="cursor-pointer"
//                 onClick={toggleSearch}
//               />

//               {showSearch && (
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                   className="absolute right-0 mt-2 z-50 border border-gray-400 rounded px-3 py-1 text-black text-sm outline-none bg-white shadow-md"
//                   autoFocus
//                 />
//               )}
//             </div>

//             {/* Bag & GitHub */}
//             <a href="#">
//               <img src={bagImg} alt="Bag" width={18} height={18} />
//             </a>
//             <a href={sourceCode} target="_blank" rel="noreferrer noopener">
//               {/* <img src={githubImg} alt="GitHub" width={18} height={18} /> */}
//             </a>
//           </div>
//         </nav>
//       </header>
//     </>
//   );
// };

// export default Navbar;

import React, { useState, useRef, useEffect } from "react";
import { appleImg, bagImg, githubImg, searchImg } from "../assets";
import { navLists, sourceCode } from "../constants";

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef();
  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
  };

  // Handle outside click to close search
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };
    
    if (showSearch) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearch]);

  return (
    <>
      {/* BLUR BACKGROUND OVERLAY */}
      <div
        className={`fixed inset-0 transition-all duration-300 z-40 ${
          showSearch
            ? "bg-black bg-opacity-30 backdrop-blur-sm"
            : "bg-transparent backdrop-blur-0 pointer-events-none"
        }`}
      ></div>

      <header className="flex w-full items-center justify-between p-5 sm:px-10 z-50 relative">
        <nav className="relative screen-max-width flex w-full items-center justify-between gap-4">
          {/* Apple Logo */}
          <a href="#">
            <img src={appleImg} alt="Apple" width={14} height={18} />
          </a>

          {/* Navigation Links */}
          <div className="flex flex-1 justify-center max-sm:hidden">
            {navLists.map((nav) => (
              <a
                key={nav}
                href="https://www.apple.com/store"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray cursor-pointer px-5 text-sm transition-all hover:text-white"
              >
                {nav}
              </a>
            ))}
          </div>

          {/* Icons Section */}
          <div className="flex items-center gap-4 max-sm:flex-1 max-sm:justify-end relative z-50">
            {/* Search Icon and Input */}
            <div className="relative" ref={searchRef}>
              <img
                src={searchImg}
                alt="Search"
                width={18}
                height={18}
                className="cursor-pointer"
                onClick={toggleSearch}
              />

              {showSearch && (
              <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="absolute right-0 mt-2 z-50 border border-gray-400 rounded px-3 py-1 text-white placeholder-white text-sm outline-none bg-transparent backdrop-blur-md shadow-md transition-all duration-300"
              autoFocus
            />
              
              )}
            </div>

            {/* Bag Icon */}
            <a href="#">
              <img src={bagImg} alt="Bag" width={18} height={18} />
            </a>

            {/* GitHub Link (hidden icon) */}
            <a href={sourceCode} target="_blank" rel="noreferrer noopener">
              {/* <img src={githubImg} alt="GitHub" width={18} height={18} /> */}
            </a>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
