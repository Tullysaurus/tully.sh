import Sidebar from "@/components/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full flex flex-row">
      <div className="w-full h-full min-h-full hidden lg:flex flex-row">
        <Sidebar />
        <div className="w-full h-full">
          {children}
        </div>
      </div>
      <div className="w-full h-full min-h-full lg:hidden flex items-center justify-center text-center p-10">
          <h1 className="text-3xl italic font-light">
            This page does not support mobile devices at this time.
          </h1>
      </div>
    </div>
  );
}
