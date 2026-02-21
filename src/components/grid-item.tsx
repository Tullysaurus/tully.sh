'use client';


export default function GridItem({
  title,
  description,
  id,
  onclick,
  preview,
  date,
}: {
  title: string;
  description: string;
  id: string;
  onclick: (id: string) => void;
  preview: React.ReactElement;
  date: number;
}) {
  const unixTime = new Date(date);
  const dayOfMonth = unixTime.getDate();
  const month = unixTime.toLocaleString('default', { month: 'short' });



  return (
    <div
      onClick={() => onclick(id)}
      className="group cursor-pointer w-[22vw] h-[32vh] bg-[#1f1f1f] rounded-lg overflow-hidden flex flex-col transition hover:scale-[1.02]"
    >
      {/* Image / Preview */}
      <div className="relative w-full h-[55%] bg-neutral-800 overflow-hidden">
        {preview}

        {/* Date badge */}
        <div className="absolute top-3 right-3 bg-[#f5b041] text-black text-xs font-semibold px-2 py-1 rounded">
          <div className="leading-none text-center">
            <div>{dayOfMonth}</div>
            <div className="text-[10px]">{month}</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 p-4 text-white">
        {/* Title */}
        <h3 className="font-semibold text-lg leading-tight group-hover:text-[#f5b041] transition">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-neutral-400 line-clamp-3">
          {description}
        </p>

        {/* Get Now */}
        <span className="mt-1 text-sm text-[#f5b041] font-medium">
          Get Now →
        </span>
      </div>
    </div>
  );
}