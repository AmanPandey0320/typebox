import React from "react";
import Link from "next/link";

const SUPPORTED_FORMATS = ["txt", "jpg", "jpeg", "png", "json"];

export type FileItem = {
  name: string;
  url: string;
};

interface FileListProps {
  files: FileItem[];
}

function getFileExtension(filename: string) {
  return filename.split(".").pop()?.toLowerCase() || "";
}

const FileList: React.FC<FileListProps> = ({ files }) => {
  const filteredFiles = files.filter((file) =>
    SUPPORTED_FORMATS.includes(getFileExtension(file.name))
  );

  if (filteredFiles.length === 0) {
    return <div className="text-gray-500">No supported files found.</div>;
  }

  return (
    <ul className="w-full max-w-2xl divide-y divide-gray-200 bg-white rounded-lg shadow">
      {filteredFiles.map((file) => (
        <li key={file.name} className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition">
          <Link href={`/${encodeURIComponent(file.name)}`} className="text-blue-600 hover:underline truncate">
            {file.name}
          </Link>
          <span className="text-xs text-gray-400 ml-2 uppercase">{getFileExtension(file.name)}</span>
        </li>
      ))}
    </ul>
  );
};

export default FileList;
