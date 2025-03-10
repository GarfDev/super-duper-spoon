import { SidebarProvider } from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/app-sidebar";
import { cn } from "~/lib/utils";
import AppNavbar, { NAV_HEIGHT } from "./app-navbar";

interface Props {
  className?: string;
  children: React.ReactNode;
}

export default function Layout({ className, children }: Props) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className={cn(className, "overflow-hidden")}>
        <AppNavbar />
        <div
          style={{ height: `calc(100vh - ${NAV_HEIGHT}px)` }}
          className={cn(
            "w-full overflow-y-scroll",
          )}
        >
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
