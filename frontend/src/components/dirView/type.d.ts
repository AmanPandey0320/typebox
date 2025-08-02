export interface FileItem {
    id: string;
    name: string;
    filePath: string;
    type: "file" | "folder";
    color: string;
    ownerId: string;
    createdAt: string | null;
    createdBy: string | null;
    lastModified: string | null;
    deletedBy: string | null;
    parentDir: string;
    thumbnail?: string;
    size?: string | number;
}