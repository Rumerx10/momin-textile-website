"use client";

import { motion, useScroll } from "framer-motion";
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";

const Navbar = () => {
  const { scrollYProgress } = useScroll();
  return (
    <div className="flex">
      <motion.div
        className="fixed left-0 top-0 right-0 h-1 z-50 origin-left bg-amber-400"
        style={{ scaleX: scrollYProgress }}
      />
      <MobileNav />
      <DesktopNav />
      
    </div>
  );
};

export default Navbar;
