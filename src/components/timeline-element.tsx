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
    "flex w-full items-center gap-3",
    "md:h-8 md:flex-row md:justify-end",
    isRight ? "md:flex-row-reverse md:pl-[calc(50%-16px)]" : "md:pr-[calc(50%-16px)]",
  ].join(" ");

  const contentClasses = [
    "group relative flex h-full w-fit cursor-pointer items-center",
    "md:after:absolute md:after:top-1/2 md:after:h-px md:after:w-4 md:after:bg-white",
    isRight ? "md:justify-start md:after:left-0" : "md:justify-end md:after:right-0",
  ].join(" ");

  const paddingClass = isRight ? "md:pl-5" : "md:pr-5";

  return (
    <div className={containerClasses}>
      <div className="h-8 w-8 rounded-full border-2 border-white bg-background flex items-center justify-center">
        {icon}
      </div>
      <div className={contentClasses}>
        <div className={paddingClass}>
          <div className="text-sm group-hover:hidden">{text}</div>
          <div className="hidden text-sm group-hover:block">{hover}</div>
        </div>
      </div>
    </div>
  );
}
