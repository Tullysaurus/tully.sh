import Sidebar from "@/components/sidebar";
import { ModalProvider } from "@/components/modal-system";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ModalProvider>
      <div className="min-h-screen w-full bg-background lg:flex lg:flex-row">
        <Sidebar />
        <div className="min-h-screen flex-1 overflow-x-hidden">
          <main className="w-full pb-8 lg:pb-0">{children}</main>
        </div>
      </div>
    </ModalProvider>
  );
}
