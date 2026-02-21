import Link from "next/link";

export default function SidebarLink({
    href,
    pathname,
    children,
}: {
    href: string;
    pathname: string;
    children: React.ReactNode;
}){
    return (
        <Link href={href} className={
            "relative flex items-center gap-2 duration-150 transition-all after:duration-150 after:transition-all after:ease-in-out after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#FFC17B] hover:after:w-full"
             + (pathname === href ? " text-[#FFC17B] skew-x-[-10deg]" : " text-white")
        }>
            {children}
        </Link>
        
    )
}