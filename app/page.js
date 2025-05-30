'use client';

import { assets } from "@/assets/assets";
import { useState } from "react";
import Image from "next/image"; // ✅ Required for Next.js <Image />
import Sidebar from "@/componets/sidebar";
import PrompBox from "@/componets/PrompBox";
import Message from "@/componets/Message";

export default function Home() {
  const [expand, setExpand] = useState(false);      // ✅ Fixed: useState (not userState)
  const [messages, setMessages] = useState([]);     // ✅ Typo fixed: "massges"
  const [isLoading, setIsLoading] = useState(false);    // ✅ Typo fixed: "loding"

  return (
    <div>
      <div className="flex h-screen">
      <Sidebar expand={expand} setExpand={setExpand} />
<div className="flex-1 flex flex-col items-center justify-center px-4 pb-8 bg-[#292a2d] text-white relative">
  <div className="md:hidden absolute px-4 top-6 flex items-center justify-between w-full">
    <Image onClick={() => setExpand(!expand)} className="rotate-180" src={assets.menu_icon} alt="Menu Icon" />
    <Image className="opacity-70" src={assets.chat_icon} alt="Chat Icon" />
  </div>

  {messages.length === 0 ? (
  <>
    <div className="flex items-center gap-3">
      <Image src={assets.logo_icon} alt="" className="h-16" />
      <p className="text-2xl font-medium">Hi, I'm Ishu-GPT.</p>
    </div>
    <p className="text-sm mt-2">How can I help you today?</p>
  </>
) : (
  <div>
    <Message role="user" content="What is Next.js?" />
  </div>
)}

<PrompBox isLoading={isLoading} setIsLoading={setIsLoading} />

  
  <p className="text-center absolute bottom-1 text-gray-500">AI-generated for reference only</p>
</div>

      
      </div>
    </div>
  );
}
