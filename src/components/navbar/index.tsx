"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Menu, Sparkles, X, LogOut } from "lucide-react";
import { Button } from "../ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsDropdownOpen(false);
        }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
        window.removeEventListener("scroll", handleScroll);
        document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      
      // We add a small delay before closing the mobile menu.
      // This gives the browser time to start the scroll animation.
      setTimeout(() => {
        setIsMobileMenuOpen(false);
      }, 300); // 300 milliseconds delay
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass border-b border-card-border backdrop-blur-glass"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollToSection("hero")}
          >
            <div className="relative">
              <Sparkles
                fill="transparent"
                className="h-8 w-8 text-primary animate-glow-pulse"
              />
              <div className="absolute inset-0 h-8 w-8 text-secondary animate-glow-pulse opacity-50" />
            </div>
            <span className="text-2xl font-bold bg-gradient-primary !bg-clip-text text-transparent">
              Pixora AI
            </span>
          </motion.div>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("features")}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Pricing
            </button>
            {status === 'loading' ? (
                <div className="w-10 h-10 bg-muted rounded-full animate-pulse" />
            ) : session?.user ? (
                <div className="relative" ref={dropdownRef}>
                    <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        <img src={session.user.image!} alt="User Avatar" className="w-10 h-10 rounded-full border-2 border-primary/50 hover:border-primary transition-colors" />
                    </button>
                    {isDropdownOpen && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute right-0 mt-2 w-48 glass rounded-xl border border-card-border shadow-lg py-2"
                        >
                            <div className="px-4 py-2 border-b border-card-border">
                                <p className="text-sm font-medium text-foreground truncate">{session.user.name}</p>
                                <p className="text-xs text-muted-foreground truncate">{session.user.email}</p>
                            </div>
                            <button 
                                onClick={() => signOut()} 
                                className="flex items-center w-full text-left px-4 py-2 text-sm text-foreground hover:bg-primary/10"
                            >
                                <LogOut className="h-4 w-4 mr-2" />
                                Sign Out
                            </button>
                        </motion.div>
                    )}
                </div>
            ) : (
                <Button
                    variant="hero"
                    className="font-semibold"
                    onClick={() => signIn("google")}
                >
                    Sign In
                </Button>
            )}
          </div>

          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        <motion.div
          initial={false}
          animate={{
            height: isMobileMenuOpen ? "auto" : 0,
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-4">
            <button
              onClick={() => scrollToSection("features")}
              className="block w-full text-left text-foreground hover:text-primary transition-colors font-medium"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="block w-full text-left text-foreground hover:text-primary transition-colors font-medium"
            >
              Pricing
            </button>
            {session?.user ? (
                 <Button variant="outline" className="w-full" onClick={() => signOut()}>
                    Sign Out
                 </Button>
            ) : (
                <Button variant="hero" className="w-full" onClick={() => signIn('google')}>
                    Sign In
                </Button>
            )}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;