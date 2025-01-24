"use client";

import React from "react";
import { SparklesCore } from "@/components/ui/sparkles"; // Adjust the import path if necessary

export function SparklesPreview({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <div className="relative h-[40rem] w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      {/* Child Content (Chatbot Section) */}
      <div className="relative z-20">{children}</div>

      {/* Title */}
      <h1 className="absolute bottom-10 md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white z-20">
        Acme
      </h1>

      {/* Animation Container */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-1/3 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] blur-sm" />
        <div className="absolute inset-x-20 top-1/3 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px" />
        <div className="absolute inset-x-60 top-1/3 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] blur-sm" />
        <div className="absolute inset-x-60 top-1/3 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px" />

        {/* Sparkles Animation */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="absolute inset-0 w-full h-full"
          particleColor="#FFFFFF"
        />

        {/* Radial Gradient */}
        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
  );
}

export function SparklesPreviewDark(): React.JSX.Element {
  return (
    <div className="h-[40rem] relative w-full bg-slate-950 flex flex-col items-center justify-center overflow-hidden rounded-md">
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
          speed={1}
        />
      </div>
      <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white relative z-20">
        Build faster
      </h1>
    </div>
  );
}

export function SparklesPreviewColorful(): React.JSX.Element {
  return (
    <div className="h-[40rem] relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlescolorful"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#00ff00"
          speed={0.5}
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-4 relative z-20">
        <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
          The Future
        </h1>
        <p className="text-neutral-300 cursor-default text-center">
          is brighter than you think
        </p>
      </div>
    </div>
  );
}
