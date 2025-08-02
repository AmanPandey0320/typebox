import React, { useRef } from "react";

const SUPPORTED_FORMATS = [".txt", ".jpg", ".jpeg", ".png", ".json"];

interface FileUploadProps {
  onUpload: (files: File[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUpload }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).filter((file) =>
        SUPPORTED_FORMATS.some((ext) => file.name.toLowerCase().endsWith(ext))
      );
      onUpload(files);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <input
        ref={inputRef}
        type="file"
        accept={SUPPORTED_FORMATS.join(",")}
        multiple
        className="hidden"
        onChange={handleFileChange}
      />
      <button
        type="button"
        className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
        onClick={() => inputRef.current?.click()}
      >
        Upload File
      </button>
      <span className="text-xs text-gray-400">Supported: txt, jpg, jpeg, png, json</span>
    </div>
  );
};

export default FileUpload;
