import React from "react";

interface FileListProps {
  dir: string;
}

const FileList: React.FC<FileListProps> = ({ dir }) => {
  return (
    <div className="text-white">
      {dir}
    </div>
  );
};

export default FileList;
