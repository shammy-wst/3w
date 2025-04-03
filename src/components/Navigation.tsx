import Link from "next/link";

const Navigation = () => {
  return (
    <nav className="bg-transparent backdrop-blur-sm text-white fixed w-full z-50">
      <div className="flex justify-between items-center h-16 w-full px-4 md:px-6">
        <Link href="/">
          <div className="flex items-center">
            <span className="text-xl md:text-2xl font-thin relative bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              3W
            </span>
          </div>
        </Link>
        <div className="flex items-center gap-4 md:gap-8">
          {["Projets", "Contact"].map((item, index) => (
            <Link
              key={index}
              href={`/${item.toLowerCase()}`}
              className="relative text-gray-300 hover:text-white transition-colors duration-300 group text-xs md:text-sm uppercase tracking-wider"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
