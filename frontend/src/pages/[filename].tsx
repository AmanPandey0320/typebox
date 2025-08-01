import React from "react";
import { useRouter } from "next/router";

const SUPPORTED_FORMATS = ["txt", "jpg", "jpeg", "png", "json"];

const FileView: React.FC = () => {
  const router = useRouter();
  const { filename } = router.query;

  // In a real app, fetch file content from backend using filename
  // Here, just show filename and a placeholder

  if (!filename || Array.isArray(filename)) {
    return <div className="p-8 text-center text-gray-500">Invalid file.</div>;
  }

  const ext = filename.split(".").pop()?.toLowerCase() || "";
  if (!SUPPORTED_FORMATS.includes(ext)) {
    return <div className="p-8 text-center text-red-500">Unsupported file type.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4">
      <h1 className="text-2xl font-bold mb-4">Viewing: {filename}</h1>
      <div className="bg-white rounded shadow p-6 w-full max-w-xl">
        {/* Placeholder for file content */}
        <div className="text-gray-700 text-center">File content preview is not implemented in this demo.</div>
      </div>
      <button
        className="mt-8 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        onClick={() => router.back()}
      >
        Back
      </button>
    </div>
  );
};

export default FileView;
