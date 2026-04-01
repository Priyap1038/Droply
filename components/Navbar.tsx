"use client";

import { useClerk, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { CloudUpload, ChevronDown, User, Menu, X } from "lucide-react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { useState, useEffect, useRef, useMemo } from "react";
import { ThemeSwitcher } from "./ThemeSwitcher";

export default function Navbar() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Check if we're on the dashboard page
  const isOnDashboard =
    pathname === "/dashboard" || pathname?.startsWith("/dashboard/");

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle body scroll lock when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Handle clicks outside the mobile menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        // Check if the click is not on the menu button (which has its own handler)
        const target = event.target as HTMLElement;
        if (!target.closest('[data-menu-button="true"]')) {
          setIsMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const handleSignOut = () => {
    signOut(() => {
      router.push("/");
    });
  };

  // Process user data with memoization for performance
  const userDetails = useMemo(() => {
    if (!isLoaded || !user) {
      return { displayName: "User", initials: "U", email: "" };
    }

    const email = user.emailAddresses?.[0]?.emailAddress || "";
    return {
      initials: (user.firstName?.[0] || user.username?.[0] || email?.[0] || "U").toUpperCase(),
      displayName: user.firstName || 
                   user.username || 
                   (email ? email.split('@')[0] : "User"),
      email: email,
    };
  }, [user, isLoaded]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "shadow-sm py-2" : "py-3 md:py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 z-10 hover:opacity-90 transition-all">
            <div className="bg-primary p-2 rounded-xl shadow-sm">
              <CloudUpload className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 tracking-tight">
              Droply
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-4 items-center">
            <ThemeSwitcher />
            <SignedOut>
              <Link href="/sign-in">
                <Button variant="light" className="font-semibold text-foreground/80 hover:text-foreground">
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button variant="solid" color="primary" className="font-semibold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]">
                  Sign Up
                </Button>
              </Link>
            </SignedOut>

            <SignedIn>
              <div className="flex items-center gap-4">
                {!isOnDashboard && (
                  <Link href="/dashboard">
                    <Button variant="flat" color="primary" className="font-semibold">
                      Dashboard
                    </Button>
                  </Link>
                )}
                <Dropdown placement="bottom-end">
                  <DropdownTrigger>
                    <Button
                      variant="light"
                      className="px-3 py-2 h-auto bg-white/50 hover:bg-white border border-border/50 transition-all rounded-2xl focus:ring-0 focus:outline-none shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar
                          name={userDetails.initials}
                          size="sm"
                          src={user?.imageUrl || undefined}
                          className="h-8 w-8 shadow-sm border border-border"
                          fallback={<User className="h-4 w-4" />}
                        />
                        <span className="text-foreground font-bold hidden sm:inline whitespace-nowrap">
                          {userDetails.displayName}
                        </span>
                        <ChevronDown className="h-3 w-3 text-muted-foreground opacity-60" />
                      </div>
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="User actions" variant="flat" className="p-2">
                    <DropdownItem
                      key="profile"
                      description={userDetails.email || "View your profile"}
                      startContent={<User className="h-4 w-4 mr-1 text-primary" />}
                      className="rounded-xl h-14 hover:bg-primary/5"
                      onClick={() => router.push("/dashboard?tab=profile")}
                    >
                      <span className="font-bold">Profile</span>
                    </DropdownItem>
                    <DropdownItem
                      key="files"
                      description="Manage your files"
                      startContent={<CloudUpload className="h-4 w-4 mr-1 text-primary" />}
                      className="rounded-xl h-14 hover:bg-primary/5"
                      onClick={() => router.push("/dashboard")}
                    >
                      <span className="font-bold">My Files</span>
                    </DropdownItem>
                    <DropdownItem
                      key="logout"
                      className="text-danger rounded-xl h-12 hover:bg-danger/5"
                      color="danger"
                      startContent={<X className="h-4 w-4 mr-1" />}
                      onClick={handleSignOut}
                    >
                      <span className="font-bold">Sign Out</span>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </SignedIn>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeSwitcher />
            <SignedIn>
              <Avatar
                name={userDetails.initials}
                size="sm"
                src={user?.imageUrl || undefined}
                className="h-8 w-8 ring-2 ring-primary/20"
                fallback={<User className="h-4 w-4" />}
              />
            </SignedIn>
            <button
              className="z-50 p-2 hover:bg-muted rounded-full transition-colors"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-foreground" />
              ) : (
                <Menu className="h-6 w-6 text-foreground" />
              )}
            </button>
          </div>

          {/* Mobile Menu Overlay */}
          {isMobileMenuOpen && (
            <div
              className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />
          )}

          {/* Mobile Menu */}
          <div
            ref={mobileMenuRef}
            className={`fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-background border-l border-border z-50 flex flex-col pt-20 px-6 shadow-2xl transition-transform duration-300 ease-in-out ${
              isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            } md:hidden`}
          >
            <SignedOut>
              <div className="flex flex-col gap-4 items-center">
                <Link href="/sign-in" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="flat" className="w-full font-medium">
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="solid" color="primary" className="w-full font-medium shadow-md">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </SignedOut>

            <SignedIn>
              <div className="flex flex-col gap-6">
                {/* User Info */}
                <div className="flex items-center gap-3 py-4 border-b border-border mb-2">
                  <Avatar
                    name={userDetails.initials}
                    size="md"
                    src={user?.imageUrl || undefined}
                    className="h-12 w-12 ring-2 ring-primary/20"
                    fallback={<User className="h-6 w-6" />}
                  />
                  <div className="overflow-hidden">
                    <p className="font-bold text-foreground truncate">{userDetails.displayName}</p>
                    <p className="text-sm text-muted-foreground truncate">{userDetails.email}</p>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex flex-col gap-2">
                  {!isOnDashboard && (
                    <Link
                      href="/dashboard"
                      className="py-3 px-4 hover:bg-muted rounded-xl transition-colors font-medium flex items-center gap-3"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <CloudUpload className="h-5 w-5 text-primary" />
                      Dashboard
                    </Link>
                  )}
                  <Link
                    href="/dashboard?tab=profile"
                    className="py-3 px-4 hover:bg-muted rounded-xl transition-colors font-medium flex items-center gap-3"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="h-5 w-5 text-primary" />
                    Profile
                  </Link>
                  <button
                    className="py-3 px-4 text-left text-danger hover:bg-danger/10 rounded-xl transition-colors mt-6 font-medium flex items-center gap-3"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleSignOut();
                    }}
                  >
                    <X className="h-5 w-5" />
                    Sign Out
                  </button>
                </div>
              </div>
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
}