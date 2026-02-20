'use client';

import { usePathname } from 'next/navigation';
import SidebarLink from './sidebar-link';
import Link from 'next/link';
import { House, Megaphone, Terminal, UserRound } from 'lucide-react';
import SocialLink from './social-link';

export default function Sidebar() {
    const pathname = usePathname();
    return (
        <div className="w-fit min-h-screen p-[clamp(0em,1.5vw,8vh)] bg-[#0f0f0f] flex flex-col justify-between items-center">
            <h1 className="h-fit w-full flex justify-center">
                <Link href="/" className="text-[clamp(1.5em,2.25vw,2.75em)] italic font-bold flex h-fit w-fit justify-center">
                    <p>tully</p>
                    <p className="text-[#FFC17B]">.sh</p>
                </Link>
            </h1>
            <div className="w-full min-h-[60%] h-[60vh] ">
                <div className="w-fit h-fit flex flex-col p-[clamp(0em,1vh,1em)] gap-[clamp(0em,0.5vw,1em)] text-[clamp(1em,2vw,1.75em)]">
                    <SidebarLink href="/" pathname={pathname}>
                        <House className="w-[clamp(1em,2vw,1.75em)]"/>
                        Home
                    </SidebarLink>
                    <SidebarLink href="/about" pathname={pathname}>
                        <UserRound className="w-[clamp(1em,2vw,1.75em)]"/>
                        About
                    </SidebarLink>
                    <SidebarLink href="/projects" pathname={pathname}>
                        <Terminal className="w-[clamp(1em,2vw,1.75em)]"/>
                        Projects
                    </SidebarLink>
                    <SidebarLink href="/blog" pathname={pathname}>
                        <Megaphone className="w-[clamp(1em,2vw,1.75em)]"/>
                        Blog
                    </SidebarLink>
                </div>
            </div>
            <div className="w-full flex flex-col justify-center gap-2">
                <div className="w-full flex flex-row justify-around items-center h-fit">
                    <SocialLink href="https://discord.com/users/694274948071555154" icon={<img src="/icons/discord.png" className="w-[clamp(8px,2vw,20px)] h-fit invert" />} />


                </div>
                <p className="text-center text-[clamp(0.5em,2vw,1em)]">
                    © 2026 Tully
                </p>
            </div>
        </div>
    )
}