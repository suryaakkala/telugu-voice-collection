"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

class Star {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  opacity: number;
  targetOpacity: number;

  constructor(ctx: CanvasRenderingContext2D, width: number, height: number) {
    this.ctx = ctx;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 1 + 0.5;
    this.x = width / 2;
    this.y = height / 2;
    this.radius = Math.random() * 2.5;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.opacity = 0;
    this.targetOpacity = Math.random();
  }

  update(mouseX: number, mouseY: number) {
    this.x += this.vx;
    this.y += this.vy;
    
    // Make stars slightly attracted to the mouse position
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const attractionStrength = 0.04; // Adjust this value for stronger/weaker attraction

    if (distance < 150) { // Only apply attraction within a certain radius
      this.vx += (dx / distance) * attractionStrength;
      this.vy += (dy / distance) * attractionStrength;
    }

    // Flicker effect
    if (Math.random() < 0.02) {
      this.targetOpacity = Math.random();
    }
    this.opacity += (this.targetOpacity - this.opacity) * 0.1;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    this.ctx.fill();
  }
}

const Header1: React.FC = () => {
  return (
    <header className="header">
      <img src="/klu.png" alt="Left Logo" className="logo" />
      <img src="/klug.png" alt="Right Logo" className="logo" />
      <style jsx>{`
        .header {
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          position: fixed;
          top: 0;
          z-index: 1000;
          background: #023047;
          padding: 5px;
        }
        .logo {
          height: 40px;
        }
      `}</style>
    </header>
  );
};

export default function LandingPage() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const mousePosRef = useRef({ x: 0, y: 0 });

  const handleTypingPracticeNavigation = () => router.push("/TypingPractice");
  const handleChatbotNavigation = () => router.push("/chatbot");
  const handleQuizNavigation = () => router.push("/QuizGenerator");
  const handleVoiceNavigation = () => router.push("/VoiceInputPractice");
  const handleTextMatchingNavigation = () => router.push("/TextMatching");
  const handleTDCNavigation = () => router.push("/tdc");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    resizeCanvas();

    starsRef.current = Array.from({ length: 200 }, () => 
      new Star(ctx, canvas.width, canvas.height)
    );

    const animate = () => {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Mouse light effect
      const gradient = ctx.createRadialGradient(
        mousePosRef.current.x,
        mousePosRef.current.y,
        0,
        mousePosRef.current.x,
        mousePosRef.current.y,
        150
      );
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      starsRef.current.forEach(star => {
        star.update(mousePosRef.current.x, mousePosRef.current.y);
        star.draw();
        
        if (star.x < 0 || star.x > canvas.width || 
            star.y < 0 || star.y > canvas.height) {
          Object.assign(star, new Star(ctx, canvas.width, canvas.height));
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);



  return (
    <div className="container">
      <canvas className="canvas" ref={canvasRef} />
      <div className="content">
        <Header1 />
        <header className="header">
          <Link href="#" className="logo-link">
            <span className="logo-text">తెలుగు Chat Bot</span>
          </Link>
          <nav className="nav">
            <Link href="#features" className="nav-link">Features</Link>
            <Link href="#about" className="nav-link">About</Link>
            <Link href="#contact" className="nav-link contact-link">Contact</Link>
          </nav>
        </header>
  
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">తెలుగు Chat Bot</h1>
            <p className="hero-description">
              Experience seamless conversations in Telugu with our intuitive AI chatbot.
            </p>
            <div className="button-group">
              {[
                { label: "Start Chat", handler: handleChatbotNavigation },
                { label: "QUIZ", handler: handleQuizNavigation },
                { label: "Voice Input Practice", handler: handleVoiceNavigation },
                { label: "Text Matcher", handler: handleTextMatchingNavigation },
                { label: "Typing Practice", handler: handleTypingPracticeNavigation },
                { label: "Contribute Your Voice 😊", handler: handleTDCNavigation },
              ].map((button, index) => (
                <Button
                  key={index}
                  onClick={button.handler}
                  variant="default"
                  className="menu-button"
                  style={{
                    background: 'linear-gradient(90deg, #007bff, #0056b3)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  {button.label}
                </Button>
              ))}
            </div>
          </div>
        </section>
      </div>
  
      <style jsx>{`
        .container {
          position: relative;
          width: 100%;
          height: 100vh;
        }
        
        .canvas {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          z-index: 0;
          pointer-events: none;
        }
        
        .content {
          position: relative;
          z-index: 1;
        }
        
        .header {
          margin-top: 50px;
          padding: 0 10px;
          width: 100%;
          height: 45px;
          display: flex;
          align-items: center;
          background: linear-gradient(90deg, #007bff, #0056b3);
          color: white;
        }
        
        .logo-link {
          display: flex;
          align-items: center;
          text-decoration: none;
          color: white;
          margin-left: 16px;
        }
        
        .logo-text {
          font-weight: bold;
          font-size: auto;
        }
        
        .nav {
          margin-left: auto;
          display: flex;
          gap: 16px;
        }
        
        .nav-link {
          font-size: 16px;
          font-weight: 500;
          text-decoration: none;
          color: white;
          cursor: pointer;
        }
        
        .contact-link {
          margin-right: 16px;
        }
        
        .hero {
          width: 100%;
          padding: 100px 0;
          text-align: center;
          background: transparent;
        }
        
        .hero-content {
          margin: 0 auto;
          padding: 0 16px;
        }
        
        .hero-title {
          font-size: 50px;
          font-weight: bold;
          margin-bottom: 16px;
          color: #007bff;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        .hero-description {
          color: #e9ecef;
          font-size: 20px;
          margin-bottom: 32px;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
        }
        
        .button-group {
          display: flex;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
        }
  
        :global(.menu-button) {
          padding: 12px 24px !important;
          font-size: 18px !important;
          border-radius: 16px !important;
          box-shadow: 0px 4px 8px rgba(0,0,0,0.2) !important;
          backdrop-filter: blur(4px) !important;
          color: white !important;
        }
  
        :global(.menu-button:hover) {
          opacity: 0.9 !important;
          transform: translateY(-4px);
        }
      `}</style>
    </div>
  );
}