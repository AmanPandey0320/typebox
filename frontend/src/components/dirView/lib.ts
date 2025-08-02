import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { FileItem } from "./type";
import { ParsedUrlQuery } from "querystring";
import { ApiErrorResponse, handleError } from "@/lib/util";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const handleFileClick = (file: FileItem, router: AppRouterInstance, query: ParsedUrlQuery) => {
    if (file.type === "folder") {
        // Navigate to the folder view
        router.push(`/?dir=${query?.dir as string || "box"}/${file.id}`);
    } else {
        //TODO: implement view file
    }
}

export const getFileDefination = async (id: String) => {
    const response = await fetch(`${BASE_URL}/file/define/${id}`, {method:"GET"});

    if(!response.ok){
        return "-"
    }

    const {data} = await response.json();

    return data;
}