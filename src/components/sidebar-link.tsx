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
            "relative flex items-center gap-2 after:duration-150 after:transition-all after:ease-in-out after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#FFC17B] hover:after:w-full"
             + (pathname === href ? " text-[#FFC17B] italic" : " text-white")
        }>
            {children}
        </Link>
        
    )
}