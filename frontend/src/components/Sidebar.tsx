import React from "react";
import Link from "next/link";
import { Cloud, Home, Plus } from "lucide-react";
import { useSidebar } from "@/context/SideBarContext";

const Sidebar: React.FC = () => {
    const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
    return (
        <aside className={`fixed mt-16 flex flex-col lg:mt-0 top-0 ps-2 left-0 h-screen transition-all duration-300 ease-in-out z-50 
        ${isExpanded || isMobileOpen
                ? "w-[256px]"
                : isHovered
                    ? "w-[256px]"
                    : "w-[64px]"
            }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
            onMouseEnter={() => !isExpanded && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <div className="flex flex-col gap-4">
                <div className="flex flex-row items-center gap-2 p-[8px]">
                    <Cloud type="filled" size={48} className="inline-block text-zinc-200" />
                    <span className="text-xl font-bold tracking-wide text-zinc-200">TypeBox</span>
                </div>
                <div className="ps-4">
                    <button className="flex items-center gap-4 px-4 py-4 rounded-lg transition text-zinc-200 bg-white/[0.09]">
                        <Plus color="currentColor" />
                        <span className="text-normal">Upload</span>
                    </button>
                </div>
                <div className="ps-4">
                    <nav className="flex flex-col gap-4 text-zinc-200">
                        <Link href="/" className="text-zinc-400 hover:text-zinc-200 px-4 py-2 font-medium transition flex flex-row items-center text-md">
                            <Home size={24} fill="currentColor" className="inline-block mr-2" />
                            Home
                        </Link>
                        <Link href="/home" className="text-zinc-400 hover:text-zinc-200 font-medium transition text-sm">My Files</Link>
                        {/* Add more navigation links as needed */}
                    </nav>
                </div>
                <div className="mt-auto pt-8 text-xs text-gray-400">© 2025 TypeBox</div>
            </div>
        </aside>
    );
};

export default Sidebar;
