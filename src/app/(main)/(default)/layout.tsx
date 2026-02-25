export default function DefaultLayout({
    children
}: {
    children: React.ReactNode
}){
    return (
        <div className="relative w-full h-fit">
            {children}
        </div>
    )
}
