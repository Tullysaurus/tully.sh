import Sidebar from "@/components/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-screen flex flex-col">
      <div className="w-full h-screen hidden lg:flex flex-row overflow-hidden">
        <Sidebar />
        <div className="flex-1 h-screen overflow-y-auto overflow-x-hidden">
          {children}
        </div>
      </div>
      <div className="w-full h-100dvh lg:hidden flex items-center justify-center text-center p-10">
          <h1 className="text-3xl italic font-light">
            This page does not support mobile devices at this time.
          </h1>
      </div>
    </div>
  );
}
