import { FileIcon } from "./file";
import { FolderIcon  } from "./folder";
import { ImageIcon } from "./image";
import { FileJsonIcon } from "./json";
import { PdfSolidIcon } from "./pdf";
import { TextIcon } from "./text";
interface FileViewIconProps {
    type: "file" | "folder";
    name: string;
}
export default function FileViewIcon({ type, name }: FileViewIconProps){
    if(type === "folder") {
        return (<FolderIcon className="text-zinc-400" size={"24px"} />);
    }

    const fileType = name.split('.').pop()?.toLowerCase();
    switch(fileType) {
        case "pdf":
            return <PdfSolidIcon className="text-red-500" size={"24px"} />;
        case "txt":
            return <TextIcon className="text-blue-500" size={"24px"} />;
        case "jpg":
        case "jpeg":
        case "png":
        case "gif":
        case "bmp":
        case "webp":
        case "svg":
        case "tiff":
        case "ico":
            return <ImageIcon className="text-cyan-500" size={"24px"} />;
        case "json":
            return <FileJsonIcon className="text-yellow-500" size={"24px"} />;
        default:
            return <FileIcon className="text-zinc-500" size={"24px"} />;
    }
}