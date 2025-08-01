import React from "react";

interface DirViewProps {
  dir: string;
}

const DirView: React.FC<DirViewProps> = ({ dir }) => {
  return (
    <div className="text-white">
      {dir}
    </div>
  );
};

export default DirView;
