import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
const Logo = () => {
  return (
    <div className="w-12 h-full">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb65rlZg8kOm6e_l9zZ7nBeTy0RLjdckA3el0bbyEUSAVRlVo_pgIQhGQ5YJm1LuiZJio&usqp=CAU"
        alt=""
        className="w-full h-full object-contain"
      />
    </div>
  );
};

const NavLinks = ({ isVisible }: { isVisible: boolean }) => {
  const linkList = ["home", "something", "something", "something"];

  return (
    <ul
      className={`list-none shadow-lg md:flex md:shadow-none ${
        isVisible ? "block" : "hidden"
      }`}
    >
      {linkList.map((link) => (
        <li className="">
          <a
            href=""
            className="block px-4 py-2 tracking-widest  transition-all capitalize bg-white border-t md:border-none hover:bg-pink-400 hover:pl-8 hover:text-white
            md:hover:text-pink-400 md:hover:bg-transparent md:hover:pl-4"
          >
            {link}
          </a>
        </li>
      ))}
    </ul>
  );
};

const Hamburger = ({ onToggle }: { onToggle: () => void }) => {
  return (
    <div className="md:hidden h-full flex">
      <button
        id="nav-toggle"
        className="text-2xl hover:scale-110 transition-transform"
        onClick={onToggle}
      >
        <FaBars />
      </button>
    </div>
  );
};

export const Header = () => {
  const [linksVisible, setLinksVisible] = useState(false);

  const toggleNav = () => {
    setLinksVisible((prev) => !prev);
  };
  return (
    <nav className="fixed w-full h-20 bg-white top-0 left-0 shadow-lg z-10">
      <div className="max-w-5xl mx-auto my-0 h-full md:flex justify-between items-center">
        {/* container. Flex display on screens 
        above medium, but normal display on screens below medium, 
        so we need a flexbox justify-between for the logo and hamburger */}
        <div className="h-full flex justify-between px-8">
          <Logo />
          <Hamburger onToggle={toggleNav} />
        </div>
        <NavLinks isVisible={linksVisible} />
      </div>
    </nav>
  );
};
