
export interface documentSchema {
    id: string;
    name: string;
    path: string;
    contentType: "directory" | "file",
    parent: string
}

export interface folderProps {
    file: documentSchema;
    renderTree: (files: documentSchema[], path: string = "/") => JSX.Element[]
    files: documentSchema[];
}