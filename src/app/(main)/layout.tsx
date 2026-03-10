 "use client";

import Sidebar from "@/components/sidebar";
import PageReveal from "@/components/page-reveal";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="min-h-screen w-full bg-background lg:flex lg:flex-row">
      <Sidebar />
      <div className="min-h-screen flex-1 overflow-x-hidden overflow-y-auto">
        <main className="w-full pb-8 lg:pb-0">
          <PageReveal>{children}</PageReveal>
        </main>
      </div>
    </div>
  );
}
