'use client';

export default function Proxy() {
  const handleGoToProxy = () => {
    window.open("https://proxy.tully.sh", "_blank");
  };

  const handleGoToProxy2 = () => {
    window.open("https://proxy2.tully.sh", "_blank");
  };

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-4 pb-10 pt-10 lg:pt-16">
      <h1 className="text-center text-4xl italic font-light sm:text-5xl">tully.sh/cheats/<span className="text-[#FFC17B]">proxy</span></h1>
      <p className="max-w-xl text-center text-base font-semibold sm:text-lg">
        Click below to continue to the proxy.
      </p>
      <div className="flex gap-4">
        <button
          onClick={handleGoToProxy}
          className="cursor-pointer rounded bg-[#f5b041] px-5 py-2 font-bold text-black transition-colors hover:bg-[#d49b3b]"
        >
          Go to proxy
        </button>
        <button
          onClick={handleGoToProxy2}
          className="cursor-pointer rounded bg-[#f5b041] px-5 py-2 font-bold text-black transition-colors hover:bg-[#d49b3b]"
        >
          Go to proxy2
        </button>
      </div>
    </div>
  );
}
