import { assets } from '@/assets/assets';
import Image from 'next/image';
import React, { useState } from 'react';

const PrompBox = ({ setIsLoading, isLoading }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setIsLoading(true);
    // Add your submission logic here
    console.log("Submitted:", prompt);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full ${false ? 'max-w-3xl' : 'max-w-2xl'} bg-[#404045] p-4 rounded-3xl mt-4 transition-all`}
    >
      <textarea
        className="outline-none w-full resize-none overflow-hidden break-words bg-transparent"
        rows={2}
        placeholder="Message Ishu-gpt"
        required
        onChange={(e) => setPrompt(e.target.value)}
        value={prompt}
      />
      <div className="flex items-center justify-between text-sm mt-2">
        <div className="flex items-center gap-2">
          <p className="flex items-center gap-2 text-xs border border-gray-300/40 px-3 py-2 rounded-full cursor-pointer hover:bg-gray-500/20 transition">
            <Image className="h-5 w-auto" src={assets.deepthink_icon} alt="DeepThink" />
            DeepThink (R1)
          </p>
          <p className="flex items-center gap-2 text-xs border border-gray-300/40 px-3 py-2 rounded-full cursor-pointer hover:bg-gray-500/20 transition">
            <Image className="h-5 w-auto" src={assets.search_icon} alt="Search" />
            Search
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Image className="w-4 cursor-pointer" src={assets.pin_icon} alt="Pin" />
          <button type="submit" className={`${prompt ? "bg-primary" : "bg-[#71717a]"} rounded-full p-2 cursor-pointer`}>
            <Image
              className="w-3.5 aspect-square"
              src={prompt ? assets.arrow_icon : assets.arrow_icon_dull}
              alt="Send"
            />
          </button>
        </div>
      </div>
    </form>
  );
};

export default PrompBox;
