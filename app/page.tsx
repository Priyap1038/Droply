import { Button } from "@heroui/button";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { Card, CardBody } from "@heroui/card";
import {
  CloudUpload,
  Shield,
  Folder,
  Image as ImageIcon,
  ArrowRight,
} from "lucide-react";
import Navbar from "../components/Navbar";


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      {/* Use the unified Navbar component */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1">
        {/* Hero section with subtle gradient background */}
        <section className="relative py-20 md:py-32 px-4 md:px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10" />
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 text-center lg:text-left transition-all">
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]">
                    Store your <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-violet-500 animate-gradient-x">images</span> <br className="hidden md:block" /> with ease
                  </h1>
                  <p className="text-xl md:text-2xl text-muted-foreground font-medium max-w-2xl">
                    Experience the future of cloud storage. <br className="hidden sm:block" /> Simple. Secure. Sophisticated.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start">
                  <SignedOut>
                    <Link href="/sign-up">
                      <Button size="lg" color="primary" className="font-bold px-8 shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                        Get Started
                      </Button>
                    </Link>
                    <Link href="/sign-in">
                      <Button size="lg" variant="bordered" className="font-bold px-8 hover:bg-muted transition-colors">
                        Sign In
                      </Button>
                    </Link>
                  </SignedOut>
                  <SignedIn>
                    <Link href="/dashboard">
                      <Button
                        size="lg"
                        color="primary"
                        className="font-bold px-8 shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                        endContent={<ArrowRight className="h-5 w-5" />}
                      >
                        Go to Dashboard
                      </Button>
                    </Link>
                  </SignedIn>
                </div>
              </div>

              <div className="flex justify-center order-first lg:order-last relative">
                <div className="relative w-72 h-72 md:w-96 md:h-96 animate-pulse-slow">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-[100px] opacity-70"></div>
                  <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-3xl rounded-[3rem] border border-border shadow-2xl">
                    <div className="bg-primary/10 p-10 rounded-full">
                      <CloudUpload className="h-24 md:h-32 w-24 md:w-32 text-primary" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features section with modern grid */}
        <section className="py-24 px-4 md:px-6 relative">
          <div className="container mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                Engineered for Excellence
              </h2>
              <div className="h-1.5 w-20 bg-primary mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {[
                { icon: CloudUpload, title: "Quick Uploads", desc: "Instantly store your files with our blazing-fast infrastructure." },
                { icon: Folder, title: "Smart Organization", desc: "Keep your workspace tidy with intelligent folder management." },
                { icon: Shield, title: "Locked Down", desc: "Elite-level security ensuring your data remains private." }
              ].map((feature, i) => (
                <Card key={i} className="border border-border bg-card shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <CardBody className="p-8 text-center space-y-4">
                    <div className="h-16 w-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:rotate-6 transition-all duration-300">
                      <feature.icon className="h-8 w-8 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.desc}
                    </p>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA section with high contrast */}
        <section className="py-24 px-4 md:px-6">
          <div className="container mx-auto">
            <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-primary/30 text-primary-foreground">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
              
              <div className="relative z-10 space-y-10">
                <h2 className="text-3xl md:text-6xl font-extrabold max-w-4xl mx-auto leading-[1.1] tracking-tight">
                  Ready to transform your <br className="hidden md:block" /> digital storage?
                </h2>
                <div className="flex justify-center">
                  <SignedOut>
                    <Link href="/sign-up">
                      <Button
                        size="lg"
                        variant="solid"
                        className="bg-white text-primary hover:bg-slate-50 font-extrabold px-14 h-16 text-xl shadow-2xl hover:scale-105 transition-all rounded-2xl border-4 border-white/20"
                        endContent={<ArrowRight className="h-6 w-6" />}
                      >
                        Join Droply Now
                      </Button>
                    </Link>
                  </SignedOut>
                  <SignedIn>
                    <Link href="/dashboard">
                      <Button
                        size="lg"
                        variant="solid"
                        className="bg-white text-primary hover:bg-slate-50 font-extrabold px-14 h-16 text-xl shadow-2xl hover:scale-105 transition-all rounded-2xl border-4 border-white/20"
                        endContent={<ArrowRight className="h-6 w-6" />}
                      >
                        Back to Dashboard
                      </Button>
                    </Link>
                  </SignedIn>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Simple refined footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="bg-primary p-1.5 rounded-lg">
                <CloudUpload className="h-5 w-5 text-primary-foreground" />
              </div>
              <h2 className="text-xl font-bold tracking-tight">Droply</h2>
            </div>
            <div className="flex gap-8 text-muted-foreground text-sm font-medium">
              <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Help</Link>
            </div>
            <p className="text-muted-foreground text-sm font-medium order-last md:order-none">
              &copy; {new Date().getFullYear()} Droply Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}