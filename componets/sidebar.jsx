import { assets } from '@/assets/assets';
import Image from 'next/image';
import React, { useState } from 'react';
import { useClerk, UserButton } from '@clerk/nextjs';
import { useAppContex } from '@/context/appcontex';
import ChatLable from './ChatLable';

const Sidebar = ({ expand, setExpand }) => {
  const { openSignIn } = useClerk();
  const { user } = useAppContex();
  const [openMenu, setOpenMenu] = useState({ id: 0, open: false });

  return (
    <div
      className={`flex flex-col justify-between bg-[#212327] pt-7 transition-all z-50 max-md:absolute max-md:h-screen ${
        expand ? 'p-4 w-64' : 'md:w-20 w-[60px] max-md:overflow-hidden'
      }`}
    >
      {/* TOP SECTION */}
      <div>
        {/* Logo and Toggle */}
        <div
          className={`flex ${
            expand ? 'flex-row gap-4 items-center' : 'flex-col items-center gap-8'
          }`}
        >
          <Image
            src={expand ? assets.logo_text : assets.logo_icon}
            alt="logo"
            className={expand ? 'w-36' : 'w-8'}
          />
          <div
            onClick={() => setExpand(!expand)}
            className="group relative flex items-center justify-center hover:bg-gray-500/20 transition-all duration-300 h-9 w-9 rounded-lg cursor-pointer"
          >
            <Image src={assets.menu_icon} alt="menu" className="md:hidden" />
            <Image
              src={expand ? assets.sidebar_icon : assets.sidebar_close_icon}
              alt="toggle sidebar"
              className="hidden md:block w-7"
            />
          </div>
        </div>

        {/* Title */}
        {expand && (
          <h1 className="mt-6 ml-2 text-lg text-white font-semibold">Ishu-GPT</h1>
        )}

        {/* New Chat Button */}
        <button
          className={`flex items-center ${
            expand ? 'gap-2 px-4 py-2' : 'justify-center p-3'
          } bg-[#3b82f6] text-white rounded-lg mt-6 ml-2 hover:bg-[#2563eb] transition`}
        >
          <Image src={assets.chat_icon} alt="new chat" width={18} height={18} />
          {expand && <span className="text-sm">New chat</span>}
        </button>

        {/* Recents */}
        {expand && (
          <div className="mt-8 text-white/25 text-sm">
            <p className="my-1">Recents</p>
            <ChatLable openMenu={openMenu} setOpenMenu={setOpenMenu} />
          </div>
        )}
      </div>

      {/* BOTTOM SECTION */}
      <div className="flex flex-col gap-2">
        {/* Get App Section */}
        <div
          className={`flex items-center cursor-pointer group relative ${
            expand
              ? 'gap-1 text-white/80 text-sm p-2.5 border border-primary rounded-lg hover:bg-white/10'
              : 'h-10 w-10 mx-auto hover:bg-gray-500/30 rounded-lg'
          }`}
        >
          <Image
            className={expand ? 'w-5' : 'w-6 mx-auto'}
            src={expand ? assets.phone_icon : assets.phone_icon_dull}
            alt="app"
          />
          {/* Tooltip */}
          <div
            className={`absolute bottom-12 ${
              expand ? 'left-1/2 -translate-x-1/2' : 'left-12'
            } opacity-0 group-hover:opacity-100 hidden group-hover:block transition`}
          >
            <div className="relative w-max bg-black text-white text-sm p-3 rounded-lg shadow-lg">
              <Image src={assets.qrcode} alt="QR Code" className="w-44" />
              <p>Scan to get Ishu-GPT App</p>
              <div
                className={`w-3 h-3 absolute bg-black rotate-45 ${
                  expand ? 'left-1/2 -translate-x-1/2' : 'left-4'
                } -bottom-1.5`}
              />
            </div>
          </div>
          {/* Label */}
          {expand && (
            <>
              <span>Get App</span>
              <Image alt="New badge" src={assets.new_icon} className="w-5" />
            </>
          )}
        </div>

        {/* Profile Section */}
        <div
          onClick={!user ? openSignIn : undefined}
          className={`flex items-center ${
            expand ? 'hover:bg-white/10 rounded-lg' : 'justify-center w-full'
          } gap-3 text-sm p-2 cursor-pointer`}
        >
          {user ? (
            <UserButton />
          ) : (
            <Image src={assets.profile_icon} alt="profile icon" className="w-7" />
          )}
          {expand && <span>My Profile</span>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
