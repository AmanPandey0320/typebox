import React from "react";

interface DirViewProps {
  isGridView: boolean;
  dir: string;
}

const DirView: React.FC<DirViewProps> = ({ dir, isGridView }) => {
  return (
    <div className="text-zinc-300 pt-2">
      <h3>{dir}</h3>
    </div>
  );
};

export default DirView;
