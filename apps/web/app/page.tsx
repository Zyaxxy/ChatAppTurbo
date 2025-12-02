import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Background from "@workspace/ui/components/background";
import Clock from "@workspace/ui/components/clock";

export default function Home() {
    return (
        <>
            <Background />

            {/* Top Navigation */}
            <header className="w-full max-w-[1800px] mx-auto p-6 md:p-12 grid grid-cols-2 md:grid-cols-12 gap-6 items-start z-50 relative border-b border-white/5 pb-6">
                {/* Logo Area */}
                <div className="md:col-span-3 flex flex-col animate-fade-up">
                    <Link
                        href="#"
                        className="font-serifHeading text-xl md:text-2xl tracking-tight text-white hover:text-gold transition-colors duration-500 font-semibold"
                    >
                        FRANKY HUNG
                    </Link>
                    <span className="font-serifBody text-xs text-neutral-500 italic mt-1">
                        Est. 2015
                    </span>
                </div>

                {/* Role / Status */}
                <div className="hidden md:flex md:col-span-3 flex-col gap-2 animate-fade-up delay-100">
                    <span className="font-serifHeading text-xs uppercase tracking-widest text-neutral-400">
                        Current Status
                    </span>
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"></span>
                        <span className="font-serifBody text-xs text-white">
                            Accepting Commissions
                        </span>
                    </div>
                </div>

                {/* Location / Time */}
                <div className="hidden md:flex md:col-span-3 flex-col gap-2 animate-fade-up delay-200">
                    <span className="font-serifHeading text-xs uppercase tracking-widest text-neutral-400">
                        Location
                    </span>
                    <span className="font-serifBody text-xs text-white">
                        Hong Kong
                        <Clock />
                    </span>
                </div>

                {/* Menu */}
                <div className="col-span-1 md:col-span-3 flex justify-end items-start gap-8 animate-fade-up delay-300">
                    <nav className="flex flex-col items-end gap-1">
                        {["Work", "Expertise", "Contact"].map((item, index) => (
                            <Link
                                key={item}
                                href="#"
                                className="group flex items-center gap-2 font-serifHeading text-sm text-white hover:text-gold transition-colors duration-300"
                            >
                                <span className="opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 text-gold text-xs">
                                    0{index + 1}
                                </span>
                                {item}
                            </Link>
                        ))}
                    </nav>
                </div>
            </header>

            {/* Main Hero Content */}
            <main className="flex-grow flex flex-col justify-center items-center relative w-full px-6 z-10 pointer-events-none">
                {/* Large Typography */}
                <div className="relative flex flex-col items-center text-center mix-blend-overlay opacity-80">
                    <h1 className="font-serifHeading text-10xl sm:text-7xl md:text-8xl lg:text-9xl font-medium tracking-tight text-white leading-[0.9] animate-fade-up delay-100">
                        Digital
                    </h1>
                    <div className="h-4 md:h-12"></div>
                    <h1 className="font-serifHeading text-10xl sm:text-7xl md:text-8xl lg:text-9xl font-medium tracking-tight text-white leading-[0.9] italic animate-fade-up delay-200">
                        Alchemist
                    </h1>
                </div>

                {/* Interactive CTA */}
                <div className="mt-12 md:mt-24 pointer-events-auto animate-fade-up delay-300">
                    <a
                        href="mailto:franky@arkon.digital"
                        className="group relative inline-flex items-center gap-4 px-8 py-4 border border-neutral-800 hover:border-gold/50 rounded-full bg-black/20 backdrop-blur-sm transition-all duration-500 overflow-hidden"
                    >
                        <span className="absolute inset-0 bg-white/5 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
                        <span className="font-serifBody text-xs md:text-sm text-neutral-300 group-hover:text-white relative z-10 tracking-wide">
                            Explore Selected Works
                        </span>
                        <ArrowDown className="w-4 h-4 text-neutral-400 group-hover:text-gold relative z-10 transition-colors" />
                    </a>
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full max-w-[1800px] mx-auto p-6 md:p-12 grid grid-cols-1 md:grid-cols-4 gap-12 text-xs z-20 relative border-t border-white/5 pt-8">
                {/* Description */}
                <div className="flex flex-col gap-4">
                    <p className="font-serifBody text-neutral-400 leading-relaxed max-w-xs">
                        Crafting immersive digital experiences through code and design.
                        Specializing in WebGL, React, and interactive storytelling.
                    </p>
                </div>

                {/* Stack */}
                <div className="flex flex-col gap-4">
                    <h3 className="font-serifHeading text-white text-sm">Tech Stack</h3>
                    <div className="grid grid-cols-2 gap-2 text-neutral-500 font-serifBody">
                        {["Three.js", "React", "TypeScript", "Node.js", "Tailwind", "Next.js"].map((tech) => (
                            <span key={tech}>{tech}</span>
                        ))}
                    </div>
                </div>

                {/* Socials */}
                <div className="flex flex-col gap-4">
                    <h3 className="font-serifHeading text-white text-sm">Connect</h3>
                    <div className="flex flex-col gap-2 font-serifBody">
                        {["LinkedIn", "Instagram", "GitHub"].map((social) => (
                            <a
                                key={social}
                                href="#"
                                className="text-neutral-500 hover:text-gold transition-colors flex items-center gap-2 group"
                            >
                                {social}
                                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Copyright */}
                <div className="flex flex-col justify-end items-start md:items-end gap-1 text-neutral-600">
                    <span className="font-serifHeading text-lg text-white">© 2025</span>
                    <span className="font-serifBody text-[10px] uppercase tracking-wider">
                        Arkon Digital Ltd.
                    </span>
                </div>
            </footer>
        </>
    );
}