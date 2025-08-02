import { ApiErrorResponse, Response, handleError } from "@/lib/util";
import React from "react";
import { GridView, ListView } from "./element";

interface DirViewProps {
  isGridView: boolean;
  dir: string;
}

/**
 * @param param0 - The directory to view
 * @param param1.isGridView - Whether to display the view in grid format
 * @returns 
 */
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const DirView: React.FC<DirViewProps> = ({ dir, isGridView }) => {
  const [files, setFiles] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fetchFiles = async () => {
      const response = await fetch(`${BASE_URL}/file/ls/${dir}`);
      if (!response.ok) {
        const errorResponse: ApiErrorResponse | Response = await response.json();
        handleError(errorResponse.error);
        return;
      }
      const { data } = await response.json();
      console.log("Files fetched:", data);
      setFiles(data || []);
    };
    fetchFiles();
  }, [dir]);

  return (
    <div className="text-zinc-300 pt-2 flex flex-col gap-2">
      <div className={`grid ${isGridView ? "grid-cols-5 gap-2" : "grid-cols-1 gap-2"}`}>
        {
          files.filter((f) => f.type === "folder").map((file, index) => {
            if (isGridView) {
              return (
                <GridView key={index} file={file} />
              );
            }
            return (
              <ListView key={index} file={file} />
            );
          })
        }
      </div>
      <div className={`grid ${isGridView ? "grid-cols-5 gap-2" : "grid-cols-1 gap-2"}`}>
        {
          files.filter((f) => f.type === "file").map((file, index) => {
            if (isGridView) {
              return (
                <GridView key={index} file={file} />
              );
            }
            return (
              <ListView key={index} file={file} />
            );
          })
        }
      </div>
    </div>
  );
};

export default DirView;
