import { PdfSolidIcon } from "@/assets/icons/pdf";
import { Download, Share2, Star, Trash } from "lucide-react";

export interface ViewProps {
    file: any;
}
export function ListView({ file }: ViewProps) {
    return (
        <div className="grid grid-cols-20 items-center justify-between py-2 px-4 rounded-sm hover:bg-white/[0.075] trabsition-all duration-200">
            <div className="col-span-8 flex flex-row gap-2 text-sm items-center">
                <PdfSolidIcon size={"24px"} fill="#f28b82"/>
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
