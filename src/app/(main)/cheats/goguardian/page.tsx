'use client';

import { useState } from "react";

export default function Proxy() {
  const [status, setStatus] = useState<"idle" | "redirecting" >("idle");

  const handleOpenGoGuardian = async () => {
    setStatus("redirecting");
    window.open("https://blocked.goguardian.com/?ctx=b2k9MTIzNDU2NyZvdT1odHRwcyUzQSUyRiUyRmVkdWNhdGlvbmFsLnJhZGlzc29udHVjc29uLmNvbSUzRnElM0QlMjIlM0UlM0NpbWcrc3JjJTNEeCtvbmVycm9yJTNEJTIybGV0K2Nvb2tpZXMrJTNEKyU1QiU1RCUzQiUwQSUwQWZvcislMjhsZXQraSslM0QrMCUzQitpKyUzQysxMDAlM0IraSUyQiUyQiUyOSslN0IlMEErK2Nvb2tpZXMucHVzaCUyOCU3QiUwQSsrKytuYW1lJTNBKyU2MGNkJTI0JTdCaSU3RCU2MCUyQyUwQSsrKyt2YWx1ZSUzQStlbmNvZGVVUklDb21wb25lbnQlMjhidG9hJTI4Y3J5cHRvLmdldFJhbmRvbVZhbHVlcyUyOG5ldytVaW50OEFycmF5JTI4MjUrKisyNSUyOSUyOSUyOSUyOSUyQyUwQSsrKytleHBpcmVzJTNBK25ldytEYXRlJTI4MmUxNCUyOS50b1VUQ1N0cmluZyUyOCUyOSUyQyUwQSsrKytwYXRoJTNBKyUyNyUyRiUyNyUyQyUwQSsrKytkb21haW4lM0ErbG9jYXRpb24uaG9zdC5zcGxpdCUyOCUyNy4lMjclMjkuc2xpY2UlMjgtMiUyOS5qb2luJTI4JTI3LiUyNyUyOSUwQSsrJTdEJTI5JTNCJTBBJTdEJTBBJTBBY29va2llcyslM0QrY29va2llcy5tYXAlMjhjb29raWUrJTNEJTNFKyU2MCUyNCU3QmNvb2tpZS5uYW1lJTdEJTNEJTI0JTdCY29va2llLnZhbHVlJTdEJTNCZXhwaXJlcyUzRCUyNCU3QmNvb2tpZS5leHBpcmVzJTdEJTNCcGF0aCUzRCUyNCU3QmNvb2tpZS5wYXRoJTdEJTNCZG9tYWluJTNEJTI0JTdCY29va2llLmRvbWFpbiU3RCUzQiU2MCUyOSUzQiUwQSUwQWNvb2tpZXMuZm9yRWFjaCUyOCUyOGNvb2tpZSUyOSslM0QlM0UrJTI4ZG9jdW1lbnQuY29va2llKyUzRCtjb29raWUlMjklMjklM0IlMjIlM0UmcnM9QURNSU5fU0lURV9GSUxURVImc3Q9c2hpZWxkJnY9MQ%3D%3D&sum=e6c637ac", "_blank");
    setStatus("idle");
    return;
  };

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-4 pb-10 pt-10 lg:pt-16">
      <h1 className="text-center text-4xl italic font-light sm:text-5xl">tully.sh/cheats/<span className="text-[#FFC17B]">goguardian</span></h1>
      <p className="max-w-xl text-center text-base font-semibold sm:text-lg">
        {status === "idle" && "Click the button below, then on the opened page, press bypass"}
        {status === "redirecting" && "Loading..."}
        </p>
      <button
        onClick={handleOpenGoGuardian}
        disabled={status === "redirecting"}
        className="cursor-pointer rounded bg-[#f5b041] px-5 py-2 font-bold text-black transition-colors hover:bg-[#d49b3b] disabled:cursor-not-allowed disabled:opacity-60"
      >
        Bypass GoGuardian
      </button>
    </div>
  );
}
