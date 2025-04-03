const Footer = () => {
  return (
    <footer className="flex justify-center items-center w-full py-6 bg-black text-white relative group overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <p className="text-sm relative z-10 flex items-center">
        <span className="relative">
          © 2024 3W Solutions. All rights reserved.
          <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white/30 group-hover:w-full transition-all duration-500"></span>
        </span>
      </p>
    </footer>
  );
};

export default Footer;
