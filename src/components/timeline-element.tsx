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

  return (
    <>
      <div className="flex w-full items-center gap-3 pl-0 lg:hidden">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-white bg-background">
          {icon}
        </div>
        <div className="group relative min-w-0 cursor-pointer">
          <div className="text-sm group-hover:hidden">{text}</div>
          <div className="hidden text-sm group-hover:block">{hover}</div>
        </div>
      </div>

      <div
        className={
          "hidden w-full items-center lg:flex " +
          (isRight
            ? "justify-start pl-[calc(50%-16px)]"
            : "flex-row-reverse justify-end pr-[calc(50%-16px)]")
        }
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-white bg-background">
          {icon}
        </div>
        <div
          className={
            "group relative cursor-pointer " +
            (isRight
              ? "pl-5 before:absolute before:left-0 before:top-1/2 before:h-px before:w-4 before:-translate-y-1/2 before:bg-white"
              : "pr-5 before:absolute before:right-0 before:top-1/2 before:h-px before:w-4 before:-translate-y-1/2 before:bg-white")
          }
        >
          <div className="text-sm group-hover:hidden">{text}</div>
          <div className="hidden text-sm group-hover:block">{hover}</div>
        </div>
      </div>
    </>
  );
}
