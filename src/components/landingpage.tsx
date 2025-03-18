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
    const speed = Math.random() * 2 + 1;
    this.x = width / 2;
    this.y = height / 2;
    this.radius = Math.random() * 1.5;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.opacity = 0;
    this.targetOpacity = Math.random();
  }

  update(mouseX: number, mouseY: number) {
    this.x += this.vx;
    this.y += this.vy;
    
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
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        <header
          style={{
            marginTop: "40px",
            width: "100%",
            height: "45px",
            display: "flex",
            alignItems: "center",
            borderBottom: "2px solid #dee2e6",
            background: "linear-gradient(90deg, #007bff, #0056b3)",
            color: "white",
            marginRight: "auto",
            marginLeft: "auto",
          }}
        >
          <Link
            href="#"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "white",
              marginLeft: "16px",
            }}
          >
            <span style={{ fontWeight: "bold", fontSize: "auto" }}>
              తెలుగు Chat Bot
            </span>
          </Link>
          <nav style={{ marginLeft: "auto", display: "flex", gap: "16px" }}>
            <Link
              href="#features"
              style={{
                fontSize: "16px",
                fontWeight: "500",
                textDecoration: "none",
                color: "white",
                cursor: "pointer",
              }}
            >
              Features
            </Link>
            <Link
              href="#about"
              style={{
                fontSize: "16px",
                fontWeight: "500",
                textDecoration: "none",
                color: "white",
                cursor: "pointer",
              }}
            >
              About
            </Link>
            <Link
              href="#contact"
              style={{
                fontSize: "16px",
                fontWeight: "500",
                textDecoration: "none",
                color: "white",
                cursor: "pointer",
                marginRight: "16px",
              }}
            >
              Contact
            </Link>
          </nav>
        </header>

        <section
          style={{
            width: "100%",
            padding: "100px 0",
            textAlign: "center",
            background: "transparent",
          }}
        >
          <div style={{ margin: "0 auto", padding: "0 16px" }}>
            <h1 style={{
              fontSize: "50px",
              fontWeight: "bold",
              marginBottom: "16px",
              color: "#007bff",
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            }}>
              తెలుగు Chat Bot
            </h1>
            <p style={{ 
              color: "#e9ecef", 
              fontSize: "20px", 
              marginBottom: "32px",
              textShadow: "1px 1px 2px rgba(0,0,0,0.5)"
            }}>
              Experience seamless conversations in Telugu with our intuitive AI chatbot.
            </p>
            <div style={{ 
              display: "flex", 
              justifyContent: "center", 
              gap: "10px",
              flexWrap: "wrap", 
            }}>
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
                  style={{
                    padding: "12px 24px",
                    fontSize: "18px",
                    background: "linear-gradient(90deg, #007bff, #0056b3)",
                    color: "white",
                    borderRadius: "16px",
                    boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
                    backdropFilter: "blur(4px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {button.label}
                </Button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}