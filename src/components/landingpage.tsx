"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  const handleChatbotNavigation = () => {
    router.push("/chatbot");
  };

  return (
    <div className="h-full w-full bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-500 flex items-center justify-center">
      {/* Floating Decorative Circles */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-purple-400 opacity-20 blur-3xl"
        animate={{
          y: [0, -30, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-indigo-400 opacity-20 blur-3xl"
        animate={{
          y: [0, 30, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Content Section */}
      <div className="relative z-10 text-center text-white px-4">
        <motion.h1
          className="text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to Conversational AI Chatbot
        </motion.h1>
        <motion.p
          className="text-lg text-gray-200 mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Explore the power of AI-driven conversations.
        </motion.p>
        <motion.button
          onClick={handleChatbotNavigation}
          className="px-6 py-3 bg-indigo-600 text-lg font-semibold rounded-md hover:bg-indigo-500"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Start Chat
        </motion.button>
      </div>
    </div>
  );
}












// "use client";

// import React from "react";
// import { useRouter } from "next/navigation";
// import { SparklesPreview } from "@/components/SparklesPreview";
// import { Boxes } from "@/components/ui/background-boxes"
// import { cn } from "@/lib/utils";

// export default function LandingPage() {
//   const router = useRouter();

//   const handleChatbotNavigation = () => {
//     router.push("/chatbot");
//   };

//   return (
//     <div className="relative flex flex-col items-center justify-center h-screen w-full bg-black text-white overflow-hidden">
//       {/* Sparkles Section */}
//       <SparklesPreview>
//         {/* Chatbot Section */}
//         <div className="absolute top-0 left-0 z-10 flex flex-col items-center justify-center h-full w-full">
//           <p className="text-center text-5xl font-medium tracking-tighter mb-6">
//             WELCOME TO CONVERSATIONAL AI CHAT BOT 😊
//           </p>
//           <button
//             onClick={handleChatbotNavigation}
//             className="px-6 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-md hover:bg-indigo-500"
//           >
//             Start Chat
//           </button>
//         </div>
//       </SparklesPreview>
//     </div>
//   );
// }


