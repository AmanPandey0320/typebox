import React, { Fragment, useEffect, useState } from "react";
import FileList from "../components/DirView";
import Console from "@/components/Console";
import { useRouter } from "next/router";
import { useRouter as useNav } from "next/navigation";
import Link from "next/link";
import { Grid2X2, List } from "lucide-react";

const Home: React.FC = () => {
  const [dirs, setDirs] = useState<string[]>([]);
  const [isGridView, setIsGridView] = useState<boolean>(true);
  const query = useRouter().query;
  const nav = useNav()

  useEffect(() => {
    const dir = query?.dir as string || "Box";
    const currDirs = dir.split("/");
    setDirs(currDirs);
  }, [query.dir]);

  const toggleView = (view: boolean) => {
    setIsGridView(view);
  };
  // const handleAddDir = () => {
  //   nav.push(`/?dir=${query?.dir as string || "Box"}/aman-${dirs.length + 1}`);
  // }


  return (
    <Console>
      <div className="flex flex-col gap-2">
        {/* <h1 className="text-3xl text-zinc-300 font-semibold p-2">{"Welcome to TypeBox!"}</h1> */}
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row text-zinc-400 text-sm">
            {
              dirs.map((d, index) => (
                <Fragment key={index}>
                  <Link href={`/?dir=${dirs.slice(0, index + 1).join("/")}`} className="text-zinc-400 hover:text-zinc-300 text-sm py-2 px-1">
                    {d}
                  </Link>
                  {
                    dirs.length - 1 !== index && (
                      <span className="text-zinc-400 text-sm py-2 px-1">
                        /
                      </span>
                    )
                  }
                </Fragment>
              ))
            }
          </div>
          <div className="flex flex-row items-center px-2">
            <button onClick={() => toggleView(true)} className={`text-zinc-200 hover:cursor-pointer hover:text-zinc-300 text-sm py-2 px-1 ps-4 rounded-s-full ${isGridView ? "bg-sky-600/50" : ""} transition-colors ease-in-out duration-200`}>
              <Grid2X2 size={18}/>
            </button>
            <button onClick={() => toggleView(false)} className={`text-zinc-200 hover:cursor-pointer hover:text-zinc-300 text-sm py-2 px-1 pe-4 rounded-e-full ${!isGridView ? "bg-sky-600/50" : ""} transition-colors ease-in-out duration-200`}>
              <List size={18}/>
            </button>
          </div>
        </div>
        <FileList isGridView={isGridView} dir={dirs.length > 0 ? dirs[dirs.length - 1] : "box"} />
        {/* <button onClick={handleAddDir} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
          {"add dir"}
        </button> */}
      </div>
    </Console>
  );
};

export default Home;

