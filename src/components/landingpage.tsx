"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const router = useRouter();

  const handleTypingPracticeNavigation = () => {
    router.push("/TypingPractice");
  };

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
        marginTop: "40px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f8f9fa",
        color: "#343a40"
      }}
    >
      <header
        style={{
          width: "100%",
          // padding: "0 16.5px",
          height: "60px",
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
            background: "linear-gradient(180deg, #e9ecef, #f8f9fa)",
          }}
        >
          <div
            style={{ margin: "0 auto", padding: "0 16px" }}
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
              <Button
                onClick={handleTypingPracticeNavigation}
                style={{
                  padding: "12px 24px",
                  fontSize: "18px",
                  background: "linear-gradient(90deg, #007bff, #0056b3)",
                  color: "white",
                  borderRadius: "16px",
                  boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
                }}
              >
                Typing Practice
              </Button>
            </div>
          </div>
        </section>
    </div>
  );
}
