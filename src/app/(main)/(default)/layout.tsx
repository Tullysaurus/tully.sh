export default function DefaultLayout({
    children
}: {
    children: React.ReactNode
}){
    return (
        <div className="relative w-full h-fit">
            {children}
            <a href="/cheats" className="fixed bottom-0 right-0 hidden aspect-video w-[5vw] h-fit cursor-pointer bg-inherit lg:block">
            </a>
        </div>
    )
}
