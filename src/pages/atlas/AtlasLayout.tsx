import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AtlasSidebar } from "@/components/atlas/AtlasSidebar";
import { Outlet } from "react-router-dom";

const AtlasLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AtlasSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center border-b px-4 gap-4 bg-background sticky top-0 z-30">
            <SidebarTrigger />
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">AI</span>
              </div>
              <span className="font-semibold text-sm">Atlas AI</span>
            </div>
          </header>
          <main className="flex-1 p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AtlasLayout;
