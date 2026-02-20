'use client';

import { usePathname } from 'next/navigation';
import SidebarLink from './sidebar-link';
import Link from 'next/link';
import { House } from 'lucide-react';

export default function Sidebar() {
    const pathname = usePathname();
    return (
        <div className="w-[15%] min-w-fit min-h-screen p-8 bg-[#0f0f0f] fixed flex flex-col justify-between items-center">
            <h1 className="h-fit w-full">
                <Link href="/" className="text-3xl italic font-bold flex h-fit w-full justify-center">
                    <p>tully</p>
                    <p className="text-[#FFC17B]">.sh</p>
                </Link>
            </h1>
            <div className="w-full min-h-[60%] h-[60vh] ">
                <div className="w-fit h-fit flex flex-col text-2xl p-8 gap-2">
                    <SidebarLink href="/" pathname={pathname}>
                    <House /> Home
                    </SidebarLink>
                    <SidebarLink href="/about" pathname={pathname}>
                        About
                    </SidebarLink>
                    <SidebarLink href="/projects" pathname={pathname}>
                        Projects
                    </SidebarLink>
                    <SidebarLink href="/blog" pathname={pathname}>
                        Blog
                    </SidebarLink>
                </div>
            </div>
            <div className="w-full flex justify-center">
                Bottom
            </div>
        </div>
    )
}