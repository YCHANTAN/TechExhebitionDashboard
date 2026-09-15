import { Suspense } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { AuthIntroTransition } from "@/components/shared/auth-intro-transition";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#F7F7F7] dark:bg-[#133020] text-[#133020] dark:text-white transition-colors duration-300 relative">
      <Suspense fallback={null}>
        <AuthIntroTransition />
      </Suspense>
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1440px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
