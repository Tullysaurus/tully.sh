import Sidebar from "@/components/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-[100vw] min-h-[100vh] h-[100vh] flex flex-row">
      <Sidebar />
      <div className="w-full h-full">
        {children}
      </div>
      
    </div>
  );
}
