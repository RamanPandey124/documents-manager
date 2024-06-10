export interface fileSystemDocument {
    id: string;
    name: string;
    path: string;
    contentType: "directory" | "file",
    parent: string
}
export interface folderContentProps {
    file: fileSystemDocument;
    renderTree: (path: string) => Promise<JSX.Element[]>
}
export interface FileContentProps {
    file: fileSystemDocument;
}

export interface hierarchyDocument {
    _id: string;
    name: string;
    path: string;
    contentType: 'directory' | "files";
    createdAt: Date;
    updatedAt: Date;
}