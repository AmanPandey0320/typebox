import { getDirname, getFilesInDirectory } from "@/lib/api";
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
const DirView: React.FC<DirViewProps> = ({ dir, isGridView }) => {
  const [files, setFiles] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fetchFiles = async () => {
      const files = await getFilesInDirectory(dir);
      setFiles(files);
    };
    fetchFiles();
  }, [dir]);

  return (
    <div className="text-zinc-300 pt-2">
      <div className={`grid ${isGridView ? "grid-cols-5 gap-2" : "grid-cols-1 gap-2"}`}>
        {
          files.map((file, index) => {
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
