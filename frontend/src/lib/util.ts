"use client";

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
export const handleError = (error: any) => {
    if (error instanceof Array) {
            return error.at(0) as String;
        }
        return error as String;
}