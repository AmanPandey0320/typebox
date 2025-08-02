export const getDirname = (dirId: string) => {
    // TODO: Implement logic to get the directory name based on dirId
    return dirId;
};

export const getFilesInDirectory = async (dirId: string) => {
    // TODO: Implement logic to get the files in the directory based on dirId
    return [
        { name: "File1.tsx", size: 1234 },
        { name: "File2.tsx", size: 5678 },
        { name: "File3.tsx", size: 91011 },
        { name: "File4.tsx", size: 1213 },
        { name: "File5.tsx", size: 1415 },
        { name: "File6.tsx", size: 1617 },
    ];
}