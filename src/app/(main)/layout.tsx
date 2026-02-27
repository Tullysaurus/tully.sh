 "use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/sidebar";
import { ModalProvider } from "@/components/modal-system";
import PageReveal from "@/components/page-reveal";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isUploadViewerRoute = pathname.startsWith("/cheats/uploads/view/");

  if (isUploadViewerRoute) {
    return (
      <ModalProvider>
        <div className="min-h-screen w-full bg-background">
          <main className="w-full">
            <PageReveal>{children}</PageReveal>
          </main>
        </div>
      </ModalProvider>
    );
  }

  return (
    <ModalProvider>
      <div className="min-h-screen w-full bg-background lg:flex lg:flex-row">
        <Sidebar />
        <div className="min-h-screen flex-1 overflow-x-hidden overflow-y-auto">
          <main className="w-full pb-8 lg:pb-0">
            <PageReveal>{children}</PageReveal>
          </main>
        </div>
      </div>
    </ModalProvider>
  );
}
