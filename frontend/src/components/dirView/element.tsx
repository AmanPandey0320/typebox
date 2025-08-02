import { Download, EllipsisVertical, Share2, SquareArrowOutUpRight, Star, Pencil, Trash } from "lucide-react";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import FileViewIcon from "@/assets/icons";
import { FileItem } from "./type";
import { useRouter as useNav } from "next/navigation";
import { useRouter } from "next/router";

import defaultThumbnail from "@/assets/images/thumbnail.png";
import { handleDownload, handleFileClick } from "../../lib/api";

export interface ViewProps {
    file: FileItem;
}

/**
 * ListView component for displaying a file in a list layout
 * @param param0 - The file to display in list view
 * @returns 
 */
export function ListView({ file }: ViewProps) {
    const nav = useNav();
    const query = useRouter().query;
    return (
        <div onClick={() => { console.log(file.id) }} className="grid grid-cols-20 items-center justify-between py-2 px-4 rounded-sm hover:bg-white/[0.075] hover:cursor-pointer trabsition-all duration-200">
            <div onClick={() => handleFileClick(file,nav,query)} className="col-span-8 flex flex-row gap-2 text-sm items-center">
                <FileViewIcon type={file.type} name={file.name} />
                <span>{file.name}</span>
            </div>
            <div className="col-span-3">{file.ownerId || "me"}</div>
            <div className="col-span-4 text-sm text-zinc-400">{file.lastModified || file.createdAt || new Date().toLocaleString()}</div>
            <div className="col-span-2 text-zinc-400">{file.size || "-"}</div>
            <div className="col-span-3 flex flex-row justify-end items-center gap-2">
                <button onClick={() => {handleDownload(file.id)}} className="p-1 rounded-md text-zinc-400 hover:text-zinc-200 transition-all duration-200 hover:cursor-pointer">
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

export function GridView({ file }: ViewProps) {
    const nav = useNav();
    const query = useRouter().query;
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const btnRef = useRef<HTMLButtonElement>(null);

    // window.addEventListener("mousedown", () => {setMenuOpen(false)});
    const handleMouseDown = useCallback(function (event: MouseEvent) {
        if (
            menuRef.current &&
            !menuRef.current.contains(event.target as Node)
        ) {
            setMenuOpen(false);
        }
    },[menuRef.current])

    window.addEventListener("mousedown", handleMouseDown);

    return (
        <div className="flex flex-col gap-1 bg-white/[0.1] hover:bg-white/[0.125] p-2 rounded-lg transition-all hover:cursor-pointer duration-200 relative">
            <div className="grid grid-cols-10 items-center justify-between py-2 px-2 rounded-sm trabsition-all duration-200">
                <div onClick={() => handleFileClick(file,nav,query)} className="col-span-8 flex flex-row gap-2 text-sm items-center">
                    <FileViewIcon type={file.type} name={file.name} />
                    <span>{file.name.length > 12 ? `${file.name.slice(0, 12)}...` : file.name}</span>
                </div>
                <div className="col-span-2 flex flex-row justify-end items-center gap-2 relative">
                    <button
                        ref={btnRef}
                        className="p-1 px-2 rounded-md text-zinc-500 hover:text-zinc-100 transition-all duration-200 hover:cursor-pointer"
                        onClick={(e) => {
                            setMenuOpen(true);
                        }}
                    >
                        <EllipsisVertical size={"16px"} />
                    </button>
                    {/* Floating menu */}
                    <div ref={menuRef}
                        className={`absolute z-50 w-48 bg-zinc-800 text-zinc-400 border border-zinc-600 rounded shadow-lg transition-all duration-200 ease-out ${menuOpen ? 'opacity-100 translate-x-0 pointer-events-auto block' : 'opacity-0 translate-x-4 pointer-events-none hidden'}`}
                        style={{
                            top: "10%",
                            left: "auto",
                            minWidth: "12rem"
                        }}
                    >
                        <button onClick={(e) => {
                            e.stopPropagation();    // Prevent click bubbling to parent div
                            console.log("open");
                            setMenuOpen(false);     // Close menu here explicitly
                        }} className="block flex flex-row gap-2 items-center w-full text-left px-4 py-2 text-xs font-semibold hover:bg-white/[0.05] hover:cursor-pointer transition-all duration-200">
                            <SquareArrowOutUpRight size={16} />
                            <span>Open</span>
                        </button>
                        <button className="block flex flex-row gap-2 items-center w-full text-left px-4 py-2 text-xs font-semibold hover:bg-white/[0.05] hover:cursor-pointer transition-all duration-200">
                            <Pencil size={16} />
                            <span>Rename</span>
                        </button>
                        <button onClick={(e) => {
                            e.stopPropagation();
                            handleDownload(file.id);
                            setMenuOpen(false);
                        }} className="block flex flex-row gap-2 items-center w-full text-left px-4 py-2 text-xs font-semibold hover:bg-white/[0.05] hover:cursor-pointer transition-all duration-200">
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
            {file.type === "file" && <div>
                <Image className="rounded-lg" src={file.thumbnail || defaultThumbnail} alt={file.name} width={256} height={256} />
            </div>}
        </div>
    );
}
