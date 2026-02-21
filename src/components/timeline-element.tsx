export default function TimelineElement({
    side="l",
    text,
    icon,
    hover
}: {
    side: "l" | "r",
    text: string,
    icon: React.ReactElement,
    hover: string,
}) {
    return (
        <div className={`w-[50%] h-8 flex flex-row${side === "r" && "-reverse"} justify-${side === "l" ? "end" : "start"} ${side === "r" ? "ml-[calc(50%-3vw)]" : "ml-4"}`}>
            <div className={`group relative w-[calc(100%-4vw)] h-full flex items-center justify-${side === "l" ? "end" : "start"} cursor-pointer ` +
            `after:w-4 after:h-px after:bg-white after:absolute after:top-[50%] after:${side === "l" ? "right": "left"}-0`}>
            <div className={`p${side === "l" ? "r" : "l"}-5`}>
                <div className="group-hover:hidden text-sm">{text}</div>
                <div className="hidden group-hover:block text-sm">{hover}</div>
            </div>
            </div>
            <div className="w-8 h-8 rounded-full border-2 border-white bg-background flex items-center justify-center">
                {icon}
            </div>
        </div>
    )
}