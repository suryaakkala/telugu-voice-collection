"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const router = useRouter();

  const handleChatbotNavigation = () => {
    router.push("/chatbot");
  };

  const handleQuizNavigation = () => {
    router.push("/QuizGenerator");
  };

  const handleVoiceNavigation = () => {
    router.push("/VoiceInputPractice");
  };

  const handleTextMatchingNavigation = () => {
    router.push("/TextMatching");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f8f9fa",
        color: "#343a40",
      }}
    >
      <header
        style={{
          padding: "0 24px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          borderBottom: "2px solid #dee2e6",
          background: "linear-gradient(90deg, #007bff, #0056b3)",
          color: "white",
        }}
      >
        <Link
          href="#"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "white",
          }}
        >
          <span style={{ fontWeight: "bold", fontSize: "28px" }}>
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
            }}
          >
            Contact
          </Link>
        </nav>
      </header>
      <main style={{ flex: 1 }}>
        <section
          style={{
            width: "100%",
            padding: "48px 0",
            textAlign: "center",
            background: "linear-gradient(180deg, #e9ecef, #f8f9fa)",
          }}
        >
          <div
            style={{ maxWidth: "700px", margin: "0 auto", padding: "0 16px" }}
          >
            <h1
              style={{
                fontSize: "50px",
                fontWeight: "bold",
                marginBottom: "16px",
                color: "#007bff",
              }}
            >
              తెలుగు Chat Bot
            </h1>
            <p style={{ color: "#343a40", fontSize: "20px", marginBottom: "32px" }}>
              Experience seamless conversations in Telugu with our intuitive AI chatbot.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
              <Button
                onClick={handleChatbotNavigation}
                style={{
                  padding: "12px 24px",
                  fontSize: "18px",
                  background: "linear-gradient(90deg, #007bff, #0056b3)",
                  color: "white",
                  borderRadius: "16px",
                  boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
                }}
              >
                Start Chat
              </Button>
              <Button
                onClick={handleQuizNavigation}
                style={{
                  padding: "12px 24px",
                  fontSize: "18px",
                  background: "linear-gradient(90deg, #007bff, #0056b3)",
                  color: "white",
                  borderRadius: "16px",
                  boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
                }}
              >
                QUIZ
              </Button>
              <Button
                onClick={handleVoiceNavigation}
                style={{
                  padding: "12px 24px",
                  fontSize: "18px",
                  background: "linear-gradient(90deg, #007bff, #0056b3)",
                  color: "white",
                  borderRadius: "16px",
                  boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
                }}
              >
                Voice Input Practice
              </Button>
              <Button
                onClick={handleTextMatchingNavigation}
                style={{
                  padding: "12px 24px",
                  fontSize: "18px",
                  background: "linear-gradient(90deg, #007bff, #0056b3)",
                  color: "white",
                  borderRadius: "16px",
                  boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
                }}
              >
                Text Matcher
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          padding: "24px 16px",
          borderTop: "2px solid #dee2e6",
          background: "linear-gradient(90deg, #e9ecef, #f8f9fa)",
        }}
      >
        <p style={{ fontSize: "14px", color: "#6c757d" }}>
          &copy; 2024 Telugu Chat Bot. All rights reserved.
        </p>
        <nav style={{ display: "flex", gap: "16px", marginLeft: "auto", fontSize: "14px" }}>
          <Link href="#" style={{ textDecoration: "none", color: "#007bff" }}>
            Terms of Service
          </Link>
          <Link href="#" style={{ textDecoration: "none", color: "#007bff" }}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
