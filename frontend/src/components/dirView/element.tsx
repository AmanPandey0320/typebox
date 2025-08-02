import { PdfSolidIcon } from "@/assets/icons/pdf";
import { Download, EllipsisVertical, Share2, SquareArrowOutUpRight, Star, Pencil, Trash } from "lucide-react";
import Image from "next/image";

import defaultThumbnail from "@/assets/images/thumbnail.png";

export interface ViewProps {
    file: any;
}

/**
 * ListView component for displaying a file in a list layout
 * @param param0 - The file to display in list view
 * @returns 
 */
export function ListView({ file }: ViewProps) {
    return (
        <div className="grid grid-cols-20 items-center justify-between py-2 px-4 rounded-sm hover:bg-white/[0.075] trabsition-all duration-200">
            <div className="col-span-8 flex flex-row gap-2 text-sm items-center">
                <PdfSolidIcon size={"24px"} fill="#f28b82" />
                <span>{file.name}</span>
            </div>
            <div className="col-span-3">{file.owner || "me"}</div>
            <div className="col-span-4">{file.lastModified || new Date().toLocaleString()}</div>
            <div className="col-span-2">{file.size}</div>
            <div className="col-span-3 flex flex-row justify-end items-center gap-2">
                <button className="p-1 rounded-md text-zinc-400 hover:text-zinc-200 transition-all duration-200 hover:cursor-pointer">
                    <Download size={"16px"} />
                </button>
                <button className="p-1 rounded-md text-zinc-400 hover:text-zinc-200 transition-all duration-200 hover:cursor-pointer">
                    <Pencil size={"16px"} />
                </button>
                <button className="p-1 rounded-md text-zinc-400 hover:text-zinc-200 transition-all duration-200 hover:cursor-pointer">
                    <Star size={"16px"} />
                </button>
                <button className="p-1 rounded-md text-zinc-400 hover:text-zinc-200 transition-all duration-200 hover:cursor-pointer">
                    <Trash size={"16px"} />
                </button>
                <button className="p-1 rounded-md text-zinc-400 hover:text-zinc-200 transition-all duration-200 hover:cursor-pointer">
                    <Share2 size={"16px"} />
                </button>
            </div>
        </div>
    );
}

/**
 * GridView component for displaying a file in a grid layout
 * @param param0 - The file to display in grid view
 * @returns 
 */
import React, { useRef, useState } from "react";

export function GridView({ file }: ViewProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const btnRef = useRef<HTMLButtonElement>(null);

    const handleMenuClick = () => {
        setMenuOpen((open) => !open);
    };

    const handleCloseMenu = (e: React.MouseEvent) => {
        e.stopPropagation();
        setMenuOpen(false);
    };

    React.useEffect(() => {
        if (!menuOpen) return;
        const handleClick = (e: MouseEvent) => {
            setMenuOpen(false);
        };
        window.addEventListener("mousedown", handleClick);
        return () => window.removeEventListener("mousedown", handleClick);
    }, [menuOpen]);

    return (
        <div className="flex flex-col gap-1 bg-white/[0.1] hover:bg-white/[0.125] p-2 rounded-lg transition-all duration-200 relative">
            <div className="grid grid-cols-10 items-center justify-between py-2 px-4 rounded-sm trabsition-all duration-200">
                <div className="col-span-8 flex flex-row gap-2 text-sm items-center">
                    <PdfSolidIcon size={"24px"} fill="#f28b82" />
                    <span>{file.name}</span>
                </div>
                <div className="col-span-2 flex flex-row justify-end items-center gap-2 relative">
                    <button
                        ref={btnRef}
                        className="p-1 rounded-md text-zinc-400 hover:text-zinc-200 transition-all duration-200 hover:cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleMenuClick();
                        }}
                    >
                        <EllipsisVertical size={"16px"} />
                    </button>
                    {/* Floating menu */}
                    <div
                        className={`absolute z-50 w-48 bg-zinc-800 text-zinc-400 border border-zinc-600 rounded shadow-lg transition-all duration-200 ease-out ${menuOpen ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 translate-x-4 pointer-events-none'}`}
                        style={{
                            top: "50%",
                            left: "50%",
                            transform: "translateY(-50%)",
                            minWidth: "12rem"
                        }}
                        onClick={handleCloseMenu}
                        aria-hidden={!menuOpen}
                    >
                            <button className="block flex flex-row gap-2 items-center w-full text-left px-4 py-2 text-xs font-semibold hover:bg-white/[0.05] hover:cursor-pointer transition-all duration-200">
                                <SquareArrowOutUpRight size={16} />
                                <span>Open</span>
                            </button>
                            <button className="block flex flex-row gap-2 items-center w-full text-left px-4 py-2 text-xs font-semibold hover:bg-white/[0.05] hover:cursor-pointer transition-all duration-200">
                                <Pencil size={16} />
                                <span>Rename</span>
                            </button>
                            <button className="block flex flex-row gap-2 items-center w-full text-left px-4 py-2 text-xs font-semibold hover:bg-white/[0.05] hover:cursor-pointer transition-all duration-200">
                                <Download size={16} />
                                <span>Download</span>
                            </button>
                            <button className="block flex flex-row gap-2 items-center w-full text-left px-4 py-2 text-xs font-semibold hover:bg-white/[0.05] hover:cursor-pointer transition-all duration-200">
                                <Star size={16} />
                                <span>Add to Favorites</span>
                            </button>
                            <button className="block flex flex-row gap-2 items-center w-full text-left px-4 py-2 text-xs font-semibold hover:bg-white/[0.05] hover:cursor-pointer transition-all duration-200">
                                <Share2 size={16} />
                                <span>Share</span>
                            </button>
                            <button className="block flex flex-row gap-2 items-center w-full text-left px-4 py-2 text-xs font-semibold hover:bg-white/[0.05] hover:cursor-pointer transition-all duration-200">
                                <Trash size={16} />
                                <span>Delete</span>
                            </button>
                        </div>
                </div>
            </div>
            <div>
                <Image className="rounded-lg" src={file.thumbnail || defaultThumbnail} alt={file.name} width={256} height={256} />
            </div>
        </div>
    );
}
