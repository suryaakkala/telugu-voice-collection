"use client";

import React from "react";
import { motion } from "framer-motion";
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
  }

  const handleTextMatchingNavigation = () => {
    router.push("/TextMatching");
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f8f9fa',
      color: '#343a40'
    }}>
      <header style={{
        padding: '0 24px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        borderBottom: '2px solid #dee2e6',
        background: 'linear-gradient(90deg, #007bff, #0056b3)',
        color: 'white'
      }}>
        <Link href="#" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'white' }}>
          <span style={{ fontWeight: 'bold', fontSize: '28px' }}>తెలుగు Chat Bot</span>
        </Link>
        <nav style={{ marginLeft: 'auto', display: 'flex', gap: '16px' }}>
          <Link href="#features" style={{ fontSize: '16px', fontWeight: '500', textDecoration: 'none', color: 'white', cursor: 'pointer' }}>Features</Link>
          <Link href="#about" style={{ fontSize: '16px', fontWeight: '500', textDecoration: 'none', color: 'white', cursor: 'pointer' }}>About</Link>
          <Link href="#contact" style={{ fontSize: '16px', fontWeight: '500', textDecoration: 'none', color: 'white', cursor: 'pointer' }}>Contact</Link>
        </nav>
      </header>
      <main style={{ flex: 1 }}>
        <section style={{ width: '100%', padding: '48px 0', textAlign: 'center', background: 'linear-gradient(180deg, #e9ecef, #f8f9fa)' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 16px' }}>
            <h1 style={{ fontSize: '50px', fontWeight: 'bold', marginBottom: '16px', color: '#007bff' }}>తెలుగు Chat Bot</h1>
            <p style={{ color: '#343a40', fontSize: '20px', marginBottom: '32px' }}>Experience seamless conversations in Telugu with our intuitive AI chatbot.</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
              <Button onClick={handleChatbotNavigation} style={{ padding: '12px 24px', fontSize: '18px', background: 'linear-gradient(90deg, #007bff, #0056b3)', color: 'white', borderRadius: '16px', boxShadow: '0px 4px 8px rgba(0,0,0,0.2)' }}>Get Started</Button>
              <Button onClick={handleQuizNavigation} style={{ padding: '12px 24px', fontSize: '18px', background: 'linear-gradient(90deg, #007bff, #0056b3)', color: 'white', borderRadius: '16px', boxShadow: '0px 4px 8px rgba(0,0,0,0.2)' }}>QUIZ</Button>
              <Button onClick={handleVoiceNavigation} style={{ padding: '12px 24px', fontSize: '18px', background: 'linear-gradient(90deg, #007bff, #0056b3)', color: 'white', borderRadius: '16px', boxShadow: '0px 4px 8px rgba(0,0,0,0.2)' }}>Voice Input Practice</Button>
              <Button onClick={handleTextMatchingNavigation} style={{ padding: '12px 24px', fontSize: '18px', background: 'linear-gradient(90deg, #007bff, #0056b3)', color: 'white', borderRadius: '16px', boxShadow: '0px 4px 8px rgba(0,0,0,0.2)' }}>Text Matcher</Button>
              
              <Button variant="outline" style={{ padding: '12px 24px', fontSize: '18px', border: '2px solid #007bff', background: 'white', color: '#007bff', borderRadius: '16px', boxShadow: '0px 4px 8px rgba(0,0,0,0.2)' }}>Learn More</Button>
            </div>
          </div>
        </section>
        <section id="features" style={{ width: '100%', padding: '48px 0', background: 'linear-gradient(180deg, #f8f9fa, #e9ecef)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
            <h2 style={{ fontSize: '40px', fontWeight: 'bold', textAlign: 'center', marginBottom: '32px', color: '#343a40' }}>Features</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              {[{
                title: 'Natural Conversations',
                description: 'Engage in fluid, context-aware conversations in Telugu.',
                icon: <svg
                  style={{ height: '48px', width: '48px', marginBottom: '16px', color: '#007bff' }}
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              }, {
                title: '24/7 Availability',
                description: 'Get assistance anytime, day or night, in Telugu.',
                icon: <svg
                  style={{ height: '48px', width: '48px', marginBottom: '16px', color: '#343a40' }}
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <path d="M12 17h.01" />
                </svg>
              }, {
                title: 'Continuous Learning',
                description: 'Our AI constantly improves its Telugu language skills.',
                icon: <svg
                  style={{ height: '48px', width: '48px', marginBottom: '16px', color: '#0056b3' }}
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                </svg>
              }].map((feature, index) => (
                <div key={index} style={{ textAlign: 'center', padding: '16px', background: 'linear-gradient(180deg, #e9ecef, #dee2e6)', borderRadius: '16px', boxShadow: '0 6px 12px rgba(0,0,0,0.2)' }}>
                  {feature.icon}
                  <h3 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '8px', color: '#007bff' }}>{feature.title}</h3>
                  <p style={{ color: '#343a40' }}>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="about" style={{ width: '100%', padding: '48px 0', background: 'linear-gradient(180deg, #f8f9fa, #e9ecef)' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center', padding: '0 16px' }}>
            <h2 style={{ fontSize: '40px', fontWeight: 'bold', marginBottom: '32px', color: '#343a40' }}>About Us</h2>
            <p style={{ color: '#6c757d', fontSize: '20px' }}>We're passionate about bridging language barriers and making technology accessible to Telugu speakers. Our AI-powered chatbot is designed to provide seamless, natural conversations in Telugu, helping users connect, learn, and get assistance in their native language.</p>
          </div>
        </section>
        {/* <section id="contact" style={{ width: '100%', padding: '48px 0', backgroundImage: 'url(https://img.freepik.com/free-photo/vintage-pink-telephone-composition_23-2148913955.jpg)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', color: 'white' }}>
          <div style={{ maxWidth: '500px', margin: '0 auto', padding: '0 16px', background: 'rgba(52, 58, 64, 0.9)', borderRadius: '16px' }}>
            <h2 style={{ fontSize: '40px', fontWeight: 'bold', marginBottom: '32px', textAlign: 'center', color: '#007bff' }}>Contact Us</h2>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label htmlFor="name" style={{ color: 'white', fontWeight: '500' }}>Name</label>
                <input id="name" style={{ padding: '12px', border: '2px solid #007bff', borderRadius: '8px', backgroundColor: 'white' }} placeholder="Your name" type="text" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label htmlFor="email" style={{ color: 'white', fontWeight: '500' }}>Email</label>
                <input id="email" style={{ padding: '12px', border: '2px solid #007bff', borderRadius: '8px', backgroundColor: 'white' }} placeholder="Your email" type="email" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label htmlFor="message" style={{ color: 'white', fontWeight: '500' }}>Message</label>
                <textarea id="message" style={{ padding: '12px', border: '2px solid #007bff', borderRadius: '8px', backgroundColor: 'white' }} placeholder="Your message" rows={4}></textarea>
              </div>
              <Button style={{ padding: '12px', borderRadius: '8px', background: 'linear-gradient(90deg, #007bff, #0056b3)', color: 'white', fontWeight: 'bold', boxShadow: '0px 4px 8px rgba(0,0,0,0.2)' }}>Send Message</Button>
            </form>
          </div>
        </section> */}
      </main>
      <footer style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '24px 16px', borderTop: '2px solid #dee2e6', background: 'linear-gradient(90deg, #e9ecef, #f8f9fa)' }}>
        <p style={{ fontSize: '14px', color: '#6c757d' }}>© 2024 Telugu Chat Bot. All rights reserved.</p>
        <nav style={{ display: 'flex', gap: '16px', marginLeft: 'auto', fontSize: '14px' }}>
          <Link href="#" style={{ textDecoration: 'none', color: '#007bff' }}>Terms of Service</Link>
          <Link href="#" style={{ textDecoration: 'none', color: '#007bff' }}>Privacy</Link>
        </nav>
      </footer>
    </div>
  );
}
