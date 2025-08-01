import React, { useRef } from "react";
import { Cloud, FileUp, FolderPlus, Plus, Trash } from 'lucide-react';

const AppBar: React.FC = () => {
    const ref = useRef<HTMLInputElement>(null);
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // TODO: Handle file upload logic here
            console.log("File selected:", file.name);
        }
    };


    return (
        <header className="w-full h-[72px] flex items-center px-6">
            <div className="flex flex-row-reverse items-center w-full">
                <input ref={ref} type="file" className="hidden" onChange={handleFileUpload} />
                <button title="Upload File" onClick={() => ref.current?.click()} className="rounded-full p-4 transition text-zinc-200 hover:cursor-pointer hover:bg-white/[0.09] text-zinc-400 hover:text-zinc-200 transition">
                    <FileUp size={20} color="currentColor" />
                </button>
                <button title="New Folder" className="rounded-full p-4 transition text-zinc-200 hover:cursor-pointer hover:bg-white/[0.09] text-zinc-400 hover:text-zinc-200 transition">
                    <FolderPlus size={20} color="currentColor" />
                </button>
                <button title="Delete" className="rounded-full p-4 transition text-zinc-200 hover:cursor-pointer hover:bg-white/[0.09] text-zinc-400 hover:text-zinc-200 transition">
                    <Trash size={20} color="currentColor" />
                </button>
            </div>
        </header>
    );
};

export default AppBar;
