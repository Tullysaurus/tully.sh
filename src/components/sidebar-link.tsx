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
        <Link href={href} className={"flex items-center gap-2 " + (pathname === href ? "text-[#FFC17B] italic" : "text-white")}>
            {children}
        </Link>
    )
}