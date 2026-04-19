import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";

export default function AppLayout() {
  return (
    <div className="min-h-screen w-full bg-background">
      <AppSidebar />
      <main className="md:ml-[260px] min-h-screen min-w-0 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}
