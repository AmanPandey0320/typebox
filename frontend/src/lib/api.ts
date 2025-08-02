const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export interface Response {
    error: any[],
    data: any[],
    message: any[]
}

export interface ApiErrorResponse {
    timestamp: string;
    status: number;
    error: string;
    path: string;
}
export const getFilesInDirectory = async (dirId: string) => {
    // TODO: Implement logic to get the files in the directory based on dirId
    const response = await fetch(`${BASE_URL}/file/define/${dirId}`);

    if (response.ok) {
        const data: Response = await response.json();
        return data;
    } else {
        //handle error
        const errorData: ApiErrorResponse | Response = await response.json();
    }

    return [
        { name: "File1.tsx", size: 1234 },
        { name: "File2.tsx", size: 5678 },
        { name: "File3.tsx", size: 91011 },
        { name: "File4.tsx", size: 1213 },
        { name: "File5.tsx", size: 1415 },
        { name: "File6.tsx", size: 1617 },
    ];
}