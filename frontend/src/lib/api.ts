import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { FileItem } from "../components/dirView/type";
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
    const response = await fetch(`${BASE_URL}/file/define/${id}`, { method: "GET" });

    if (!response.ok) {
        return "-"
    }

    const { data } = await response.json();

    return data;
}

export const uploadFiles = async (files: FileList, baseDir: string) => {
    const formdata = new FormData();
    for (var i = 0; i < files.length; i++) {
        formdata.append("files", files[i]);
    }
    formdata.append("baseDir", baseDir);

    const requestOptions = {
        method: "POST",
        body: formdata
    };

    const res = await fetch(`${BASE_URL}/file/upload`, requestOptions);

    if (!res.ok) {
        const { error } = await res.json();
        return {
            status: false,
            error: handleError(error)
        }
    }

    const data = await res.json();

    return {
        status: true,
        ...data
    }
}

export const createFolder = async (baseDir: string, name: string) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("name", name);
    urlencoded.append("baseDir", baseDir);

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded
    };

    const res = await fetch(`${BASE_URL}/file/create_folder`, requestOptions);

    if (!res.ok) {
        const { error } = await res.json();
        return {
            status: false,
            error: handleError(error)
        }
    }

    const data = await res.json();

    return {
        status: true,
        ...data
    }
}

export const handleDownload = (fileId:string) => {
    const url = `${BASE_URL}/file/download/${fileId}`
    window.open(url, '_blank');
}