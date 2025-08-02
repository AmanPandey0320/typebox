import React, { Fragment, useRef } from "react";
import { FileUp, FolderPlus } from 'lucide-react';
import { Modal } from "./Modal";
import { useRouter } from "next/router";
import { uploadFiles } from "@/lib/api";
import { Bounce, toast, ToastContainer } from "react-toastify";

const AppBar: React.FC = () => {
    const ref = useRef<HTMLInputElement>(null);
    const newFolderRef = useRef<HTMLInputElement>(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const query = useRouter().query;

    const toggleModal = (open: boolean) => {
        setIsModalOpen(open);
    }

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        const dir = query?.dir as string || "box";
        const baseDir = dir.split("/").pop() as string;

        if (files != null) {
            // TODO: Handle file upload logic here
            uploadFiles(files, baseDir)
                .then(() => {
                    toast.success('File uploaded!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Bounce,
                    });
                })
                .catch(() => {
                    toast.error('Error occured!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Bounce,
                    });
                })
                .finally(() => {
                    window.location.reload();
                })
        }
    };

    const handleCreateFolder = () => {
        // TODO: Handle create folder logic here
        console.log("Creating new folder...", newFolderRef.current?.value);
        setIsModalOpen(false);
    }


    return (
        <Fragment>
            <ToastContainer />
            <header className="w-full h-[72px] flex items-center px-6">
                <div className="flex flex-row-reverse items-center w-full">
                    <input ref={ref} type="file" className="hidden" onChange={handleFileUpload} />
                    <button title="Upload File" onClick={() => ref.current?.click()} className="rounded-full p-4 transition text-zinc-200 hover:cursor-pointer hover:bg-white/[0.09] text-zinc-400 hover:text-zinc-200 transition">
                        <FileUp size={20} color="currentColor" />
                    </button>
                    <button title="New Folder" onClick={() => toggleModal(true)} className="rounded-full p-4 transition text-zinc-200 hover:cursor-pointer hover:bg-white/[0.09] text-zinc-400 hover:text-zinc-200 transition">
                        <FolderPlus size={20} color="currentColor" />
                    </button>
                </div>
            </header>
            <Modal title="New Folder" className="w-1/4" isOpen={isModalOpen} onClose={() => toggleModal(false)}>
                <div className="flex flex-col gap-4">
                    <input type="text" ref={newFolderRef} placeholder="Folder Name" className="h-11 w-full rounded-sm border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-zinc-400 focus:outline-hidden focus:ring-1 bg-zinc-900 text-white/90 placeholder:text-white/30 focus:border-sky-800" />
                    <div className="flex flex-row items-center justify-end gap-2">
                        <button onClick={handleCreateFolder} className="text-blue-400 rounded-full hover:bg-blue-400/10 hover:cursor-pointer text-sm font-medium px-4 py-2 rounded transition-colors">
                            {"Create"}
                        </button>
                        <button className="text-blue-400 rounded-full hover:bg-blue-400/10 hover:cursor-pointer text-sm font-medium px-4 py-2 rounded transition-colors" onClick={() => toggleModal(false)}>
                            {"Cancel"}
                        </button>
                    </div>
                </div>
            </Modal>
        </Fragment>
    );
};

export default AppBar;
