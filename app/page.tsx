"use client";

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronDown, 
  ChevronUp, 
  Globe, 
  Github, 
  Linkedin, 
  Youtube, 
  Instagram, 
  Twitter,
  ExternalLink,
  Code,
  Sparkles,
  Zap,
  Target,
  Moon,
  Sun,
  Menu,
  X
} from 'lucide-react';

// Advanced Custom Cursor Component
function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trailPosition, setTrailPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    let animationFrame: number;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const updateTrailPosition = () => {
      setTrailPosition(prev => ({
        x: prev.x + (mousePosition.x - prev.x) * 0.15,
        y: prev.y + (mousePosition.y - prev.y) * 0.15,
      }));
      animationFrame = requestAnimationFrame(updateTrailPosition);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Add event listeners
    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // Hide cursor when mouse leaves window
    const handleMouseLeaveWindow = () => setIsVisible(false);
    const handleMouseEnterWindow = () => setIsVisible(true);
    
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    // Start trail animation
    updateTrailPosition();

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
      cancelAnimationFrame(animationFrame);
    };
  }, [mousePosition.x, mousePosition.y]);

  return (
    <>
      {/* Main cursor pointer */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-all duration-200 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
        }}
      >
        <div className={`transition-all duration-200 ${
          isHovering ? 'scale-110' : isClicking ? 'scale-90' : 'scale-100'
        }`}>
          {/* Cursor pointer shape */}
          <div className="relative">
            {/* Main cursor body */}
            <div className={`w-0 h-0 border-l-[12px] border-l-primary border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent transition-all duration-200 ${
              isClicking ? 'drop-shadow-lg drop-shadow-primary/50' : ''
            }`} />
            {/* Cursor outline */}
            <div className="absolute top-0 left-0 w-0 h-0 border-l-[14px] border-l-primary/20 border-t-[9px] border-t-transparent border-b-[9px] border-b-transparent -translate-x-[2px] -translate-y-[1px]" />
          </div>
        </div>
      </div>

      {/* Trail cursor */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-[9998] transition-all duration-100 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          transform: `translate(${trailPosition.x}px, ${trailPosition.y}px)`,
        }}
      >
        <div className={`transition-all duration-100 ${
          isHovering ? 'scale-110' : isClicking ? 'scale-90' : 'scale-100'
        }`}>
          <div className="relative">
            <div className="w-0 h-0 border-l-[10px] border-l-primary/60 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent" />
            <div className="absolute top-0 left-0 w-0 h-0 border-l-[12px] border-l-primary/20 border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent -translate-x-[2px] -translate-y-[1px]" />
          </div>
        </div>
      </div>

      {/* Cursor shadow/glow */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-[9997] transition-all duration-300 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          transform: `translate(${trailPosition.x - 5}px, ${trailPosition.y - 5}px)`,
        }}
      >
        <div className={`transition-all duration-300 ${
          isHovering ? 'scale-150' : isClicking ? 'scale-75' : 'scale-100'
        }`}>
          <div className="w-0 h-0 border-l-[16px] border-l-primary/10 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent blur-sm" />
        </div>
      </div>

      {/* Click ripple effect */}
      {isClicking && (
        <div
          className="fixed top-0 left-0 pointer-events-none z-[9996]"
          style={{
            transform: `translate(${mousePosition.x - 15}px, ${mousePosition.y - 15}px)`,
          }}
        >
          <div className="w-8 h-8 border-2 border-primary/60 rounded-full animate-ping" />
        </div>
      )}

      {/* Hover glow effect */}
      {isHovering && (
        <div
          className="fixed top-0 left-0 pointer-events-none z-[9995]"
          style={{
            transform: `translate(${trailPosition.x - 20}px, ${trailPosition.y - 20}px)`,
          }}
        >
          <div className="w-12 h-12 bg-primary/10 rounded-full animate-pulse blur-sm" />
        </div>
      )}
    </>
  );
}

// Theme Toggle Component
function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="fixed top-6 right-6 z-50 w-12 h-12 rounded-full bg-card/80 backdrop-blur-sm border border-border hover:bg-accent transition-all duration-300"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5 text-orange-400" />
      ) : (
        <Moon className="h-5 w-5 text-slate-600" />
      )}
    </Button>
  );
}

// Mobile Menu Component
function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 left-6 z-50 w-12 h-12 rounded-full bg-card/80 backdrop-blur-sm border border-border hover:bg-accent transition-all duration-300 md:hidden"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>
      
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-sm md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <a 
              href="#about" 
              className="text-2xl font-medium hover:text-primary transition-colors duration-300 hover:scale-105" 
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(false);
                setTimeout(() => {
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
            >
              About
            </a>
            <a 
              href="#projects" 
              className="text-2xl font-medium hover:text-primary transition-colors duration-300 hover:scale-105" 
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(false);
                setTimeout(() => {
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
            >
              Projects
            </a>
            <a 
              href="#contact" 
              className="text-2xl font-medium hover:text-primary transition-colors duration-300 hover:scale-105" 
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(false);
                setTimeout(() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </>
  );
}

// Project data
const projects = [
    {
      name: "Sharefast",
      description: "A streamlined platform that enables creators and agencies to share large video files effortlessly. Users can upload videos up to 2GB, receive an instant shareable link, and allow clients to view and comment directly in the browser.",
    shortDescription: "Large video file sharing platform",
      link: "https://usesharefast.vercel.app/",
      image: "/images/sharefast.png",
      year: "2025",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      name: "JuniAI",
      description: "An AI-powered journaling app that converts spoken words into structured journal entries. Users can record their thoughts, and the AI organizes them with tags, mood analysis, and search functionality.",
    shortDescription: "AI voice-to-text journaling app",
      link: "https://juniai.vercel.app/",
      image: "/images/juniai.png",
      year: "2025",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      name: "Eshaqal",
      description: "A platform designed to facilitate the sharing of resources and information among users, enhancing collaboration and connectivity within communities. It provides tools for sharing statistics and insights.",
    shortDescription: "Community resource sharing platform",
      link: "https://www.eshaqal.com/",
      image: "/images/eshaqal.png",
      year: "2025",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      name: "23Labs",
      description: "A web development agency specializing in creating clean, conversion-focused websites and SaaS applications. Their portfolio includes projects like MagicPost and BioFlow, highlighting their expertise in building responsive and user-centric digital solutions.",
    shortDescription: "Web development agency portfolio",
      link: "https://23labs.vercel.app/",
      image: "/images/23labs.png",
      year: "2025",
      gradient: "from-orange-500 to-red-500"
    },
    {
      name: "BetterNote",
      description: "An advanced notes application that offers features like markdown support, task management, and a user-friendly interface, aiming to enhance productivity and organization.",
    shortDescription: "Advanced markdown notes app",
      link: "https://better-note-eight.vercel.app/",
      image: "/images/betternote.png",
      year: "2025",
      gradient: "from-indigo-500 to-blue-500"
    },
    {
      name: "BioFlow",
      description: "A customizable link-in-bio tool designed for creators and freelancers. It allows users to create aesthetic, personalized pages that consolidate all their important links in one place, complete with analytics and theme customization options.",
    shortDescription: "Customizable link-in-bio tool",
      link: "https://bio-flow.vercel.app/",
      image: "/images/bioflow.png",
      year: "2025",
      gradient: "from-teal-500 to-cyan-500"
    },
    {
      name: "Planner",
      description: "A project management tool that simplifies task tracking and team collaboration. It offers features like markdown support, task categorization, and an intuitive interface to streamline project workflows.",
    shortDescription: "Project management & task tracking",
      link: "https://plannner.vercel.app/",
      image: "/images/plannner.png",
      year: "2025",
      gradient: "from-violet-500 to-purple-500"
    },
    {
      name: "ChapterMind",
      description: "An AI-powered platform that generates and manages video timestamps, facilitating the creation of video chapters. Users can paste YouTube URLs, and the AI generates accurate timestamps, which can be edited and copied for use in video descriptions.",
    shortDescription: "AI video timestamp generator",
      link: "https://chaptermind.vercel.app/",
      image: "/images/chaptermind.png",
      year: "2024",
      gradient: "from-rose-500 to-pink-500"
    },
    {
      name: "MagicPost",
      description: "An AI tool that transforms YouTube videos into LinkedIn posts. It allows users to repurpose video content into engaging posts, saving time and enhancing content strategy.",
    shortDescription: "YouTube to LinkedIn post converter",
      link: "https://trymagicpost.vercel.app/",
      image: "/images/magicpost.png",
      year: "2024",
      gradient: "from-amber-500 to-orange-500"
    }
  ];

// Project Card Component
function ProjectCard({ project, index }: { project: any, index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <Card className="group border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-500 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10">
      <CardContent className="p-6">
        <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center gap-4">
            <div className={`w-12 h-12 bg-gradient-to-r ${project.gradient} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 glow-animation`}>
              <Code className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors font-monk">
                {project.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="text-xs">
                  {project.year}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {project.shortDescription}
                </span>
              </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.link, '_blank');
              }}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          <div className="transition-transform duration-300 group-hover:scale-110">
              {isExpanded ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
          </div>
        </div>
      </div>
      
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isExpanded ? 'max-h-[500px] opacity-100 mt-6' : 'max-h-0 opacity-0'
      }`}>
          <p className="text-muted-foreground leading-relaxed mb-6">
            {project.description}
          </p>
          <div className="relative group/image">
            <Image
              src={project.image}
              alt={project.name}
              width={800}
              height={400}
              className="w-full h-auto max-h-96 object-contain rounded-xl shadow-xl transition-all duration-500 group-hover/image:scale-[1.02] group-hover/image:shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl opacity-0 group-hover/image:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  onClick={() => window.open(project.link, '_blank')}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-xl font-semibold shadow-lg transform scale-95 group-hover/image:scale-100 transition-all duration-300"
                >
                  View Live Project
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Main Component
export default function MinimalistPortfolio() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background text-foreground font-inter cursor-none">
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Navigation */}
      <ThemeToggle />
      <MobileMenu />

      {/* Desktop Navigation */}
      <nav className="hidden md:flex fixed top-6 left-1/2 transform -translate-x-1/2 z-40 bg-card/80 backdrop-blur-sm border border-border rounded-full px-6 py-3">
        <div className="flex items-center gap-8">
          <a 
            href="#about" 
            className="text-sm font-medium hover:text-primary transition-colors duration-300 hover:scale-105"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            About
          </a>
          <a 
            href="#projects" 
            className="text-sm font-medium hover:text-primary transition-colors duration-300 hover:scale-105"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Projects
          </a>
          <a 
            href="#contact" 
            className="text-sm font-medium hover:text-primary transition-colors duration-300 hover:scale-105"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Contact
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <section id="about" className="mb-32">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-12">
            <div className="flex-1 space-y-8">
              <div className="space-y-4">
                <h1 className="text-6xl lg:text-8xl font-bold text-foreground leading-none font-monk tracking-tight fade-in-up">
                  abdirahman
                </h1>
                <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium fade-in-up-delay-1">
              <Globe className="w-4 h-4" />
                  <span>somalia, earth</span>
                </div>
            </div>
              
              <p className="text-xl text-muted-foreground leading-relaxed font-light fade-in-up-delay-2">
              i'm a 20 y/o self-taught aspiring entrepreneur, software engineer from somalia 🇸🇴
            </p>
            
              <div className="space-y-3 fade-in-up-delay-3">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span className="text-foreground">passionate about creating digital experiences</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-primary" />
                  <span className="text-foreground">always learning and building</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex flex-wrap gap-4 pt-6">
                <a 
                  href="https://x.com/abdirahmanxyz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-6 py-3 bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Twitter className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    @abdirahmanxyz
                  </span>
                </a>
                
                <a 
                  href="https://www.linkedin.com/in/abdirahman-mohamett-5919b0274/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-6 py-3 bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Linkedin className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    LinkedIn
                  </span>
                </a>
                
                <a 
                  href="https://www.instagram.com/abdemett/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-6 py-3 bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Instagram className="w-4 h-4 text-white" />
              </div>
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    @abdemett
                  </span>
                </a>
            </div>
          </div>
          
            <div className="relative float-animation">
              <Avatar className="h-56 w-56 lg:h-64 lg:w-64 ring-4 ring-primary/30 shadow-2xl rounded-xl hover:ring-primary/50 transition-all duration-300 hover:scale-105">
                <AvatarImage src="/images/user.jpg" alt="abdirahman" className="object-cover rounded-xl" />
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary/60 text-primary-foreground font-bold text-4xl font-monk rounded-xl">
                  AM
                </AvatarFallback>
            </Avatar>
          </div>
      </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-gradient-to-r from-primary/20 to-primary/10 rounded-xl flex items-center justify-center shadow-lg glow-animation">
              <Code className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-4xl font-bold text-foreground font-monk">projects</h2>
          </div>
          
          <div className="space-y-6">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mb-32">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-foreground font-monk">let's work together</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                i'm always interested in new opportunities and collaborations. 
                let's build something amazing together.
              </p>
          </div>
          
            <div className="flex items-center justify-center">
              <a 
                href="mailto:abdemohamett@gmail.com?subject=Let's work together&body=Hi Abdirahman,%0D%0A%0D%0AI'd love to connect and discuss potential opportunities.%0D%0A%0D%0ABest regards,"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/25 glow-animation"
              >
                <span>Get in touch</span>
                <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-muted-foreground text-sm">
          <p>© 2025 abdirahman. built with next.js & shadcn/ui</p>
        </footer>
      </div>
    </div>
  );
}