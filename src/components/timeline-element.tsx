import React from "react";

type TimelineElementProps = {
  side?: "l" | "r";
  text: string;
  icon: React.ReactElement;
  hover: string;
};

export default function TimelineElement({
  side = "l",
  text,
  icon,
  hover,
}: TimelineElementProps) {
  const isRight = side === "r";

  const containerClasses = [
    "w-[50%] h-8 flex flex-row",
    isRight ? "flex-row-reverse ml-[calc(50%-3vw)]" : "ml-4",
    isRight ? "justify-start" : "justify-end",
  ].join(" ");

  const contentClasses = [
    "group relative w-[calc(100%-4vw)] h-full flex items-center cursor-pointer",
    isRight ? "justify-start" : "justify-end",
    "after:w-4 after:h-px after:bg-white after:absolute after:top-1/2",
    isRight ? "after:left-0" : "after:right-0",
  ].join(" ");

  const paddingClass = isRight ? "pl-5" : "pr-5";

  return (
    <div className={containerClasses}>
      <div className={contentClasses}>
        <div className={paddingClass}>
          <div className="text-sm group-hover:hidden">{text}</div>
          <div className="hidden text-sm group-hover:block">{hover}</div>
        </div>
      </div>

      <div className="w-8 h-8 rounded-full border-2 border-white bg-background flex items-center justify-center">
        {icon}
      </div>
    </div>
  );
}