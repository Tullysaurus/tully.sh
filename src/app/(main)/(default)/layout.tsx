export default function DefaultLayout({
    children
}: {
    children: React.ReactNode
}){
    return (
        <div className="w-full h-fit">
            {children}
            <a href="/cheats" className="absolute right-0 bottom-0 w-[5vw] aspect-video h-fit bg-inherit cursor-pointer">
            </a>
        </div>
    )
}