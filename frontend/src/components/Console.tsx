import AppBar from "./AppBar";
import { useSidebar } from "@/context/SideBarContext";
import Sidebar from "./Sidebar";
interface ConsoleProps {
    children?: React.ReactNode;
    className?: string;
}
export default function Console({ children, className }: ConsoleProps) {
      const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[256px]"
    : "lg:ml-[64px]";
  return (
    <div className="min-h-screen xl:flex bg-zinc-900">
      {/* Sidebar and Backdrop */}
      <Sidebar />
      <div
        className={`flex-1 transition-all  duration-300 ease-in-out ${mainContentMargin}`}
      >
       <AppBar/>
        <main className="p-4 max-h-[calc(100vh-64px)] min-h-[calc(100vh-64px)] bg-zinc-950 border rounded-ss-2xl overflow-y-auto small-scrollbar">{children}</main>
      </div>
    </div>
  );
}