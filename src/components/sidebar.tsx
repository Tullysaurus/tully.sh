"use client";

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import SidebarLink from './sidebar-link';
import Link from 'next/link';
import { BugPlay, CloudUpload, Github, House, Megaphone, Server, Terminal, Key, Router } from 'lucide-react';
import SocialLink from './social-link';
import AuthModal from './auth-modal';
import path from 'path';

export default function Sidebar() {
    const pathname = usePathname();
    const [showAuthModal, setShowAuthModal] = useState(false);

    const textClamp = "clamp(1em,1.5vw,1.75em)"


    // Only show links to pages on the same subdomain (for better security)
    const Urls : {
        [key: string]: {
            name: string,
            icon: React.ReactElement
        }
    } = Object.fromEntries(Object.entries({
        "/": {
            name: "Home",
            icon: (<House className={`w-[${textClamp}]`}/>)
        },
        "/projects": {
            name: "Projects",
            icon: (<Terminal className={`w-[${textClamp}]`}/>)
        },
        "/blog": {
            name: "Blog",
            icon: (<Megaphone className={`w-[${textClamp}]`}/>)
        },
        "/cheats": {
            name: "Home",
            icon: (<House className={`w-[${textClamp}]`}/>)
        },
        "/cheats/scripts": {
            name: "Scripts",
            icon: (<BugPlay className={`w-[${textClamp}]`}/>)
        },
        "/cheats/uploads": {
            name: "Uploads",
            icon: (<CloudUpload className={`w-[${textClamp}]`}/>)
        },
        "/cheats/proxy": {
            name: "Proxy",
            icon: (<Router className={`w-[${textClamp}]`}/>)
        }
    }).filter(([k, v]) => (
        k.startsWith("/cheats") && pathname.startsWith("/cheats") // show cheats on cheats subdomain
        || !pathname.startsWith("/cheats") && !k.startsWith("/cheats") // show everything but cheats while not on the cheats domain
    )))
    
    return (
        <div className="w-fit h-full p-[clamp(0em,3vw,8vh)] bg-[#0f0f0f] flex flex-col justify-between items-center">
            <h1 className="h-fit w-full flex justify-center">
                <Link href="/" className="text-[clamp(1.5em,2.25vw,2.75em)] italic font-bold flex h-fit w-fit justify-center">
                    <p>tully</p>
                    <p className="text-[#FFC17B]">.sh</p>
                </Link>
            </h1>
            <div className="w-full min-h-[60%] h-[60vh] ">
                <div className={`w-fit h-fit flex flex-col p-[clamp(0em,1vh,1em)] gap-[clamp(0em,0.5vw,1em)] text-[${textClamp}]`}>
                    {
                        Object.keys(Urls).map((key) => {
                            return (
                                <SidebarLink key={key} href={key} pathname={pathname}>
                                    {Urls[key].icon}
                                    {Urls[key].name}
                                </SidebarLink> 
                            )
                        })
                    }                   
                </div>
            </div>
            <div className="w-full flex flex-col justify-center gap-3">
                {
                    pathname.startsWith("/cheats") && (
                        <button onClick={() => setShowAuthModal(true)} className="h-[30%] w-full bg-[#f5b041] hover:bg-[#d49b3b] text-black font-bold py-2 rounded transition-transform active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2">
                            <Key size={20}/>
                            Enter Key
                        </button>
                    )
                }
                <div className="w-full flex flex-row justify-around items-center h-fit">
                    <SocialLink href="https://discord.com/users/694274948071555154" icon={<img src="https://r2.tully.sh/icons/discord.png" className="w-[clamp(8px,2vw,20px)] h-fit" />} />
                    <SocialLink href="https://github.com/tullysaurus" icon={<Github className="w-[clamp(1em,2vw,1.75em)] fill-white"/>} />
                </div>
                <p className="text-center text-[clamp(0.5em,2vw,1em)]">
                    © 2026 Tully
                </p>
            </div>
            {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
        </div>
    )
}