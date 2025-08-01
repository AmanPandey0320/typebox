import React, { useState } from "react";
import FileList, { FileItem } from "../components/FileList";
import FileUpload from "../components/FileUpload";
import AppBar from "@/components/AppBar";
import Console from "@/components/Console";

const Home: React.FC = () => {
  const [files, setFiles] = useState<FileItem[]>([]);

  const handleUpload = (newFiles: File[]) => {
    const mapped = newFiles.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));
    setFiles((prev) => [...prev, ...mapped]);
  };

  return (
    <Console>
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-8">Your Files</h1>
        <div className="mb-6">
          <FileUpload onUpload={handleUpload} />
        </div>
        <FileList files={files} />
      </div>
    </Console>
  );
};

export default Home;

