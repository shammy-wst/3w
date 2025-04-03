import Link from "next/link";
import Image from "next/image";

const Navigation = () => {
  return (
    <nav className="bg-black/80 backdrop-blur-sm text-white fixed w-full z-50">
      <div className="flex justify-between items-center h-16 w-full px-6">
        <Link href="/" className="flex items-center group">
          <div className="relative w-10 h-10 animate-pulse">
            <Image
              src="/Tetrahedron.gif"
              alt="3W Solutions Logo"
              fill
              className="object-contain scale-110"
              priority
            />
          </div>
        </Link>
        <div className="flex items-center gap-8">
          {["Projets", "Contact"].map((item, index) => (
            <Link
              key={index}
              href={`/${item.toLowerCase()}`}
              className="relative text-gray-300 hover:text-white transition-colors duration-300 group text-sm uppercase tracking-wider"
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
