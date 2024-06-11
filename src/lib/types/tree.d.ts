export interface InputProps {
    name: string;
    label?: string;
    type: string;
    value?: string | number;
    placeholder?: string;
    focus?: boolean;
    defaultValue?: string | number
}

export interface ModalInterface {
    isModal: boolean;
    handleModal: () => void;
    children: React.ReactNode;
}
export interface resourceDocument {
    _id: string;
    name: string;
    contentType: 'directory' | "files";
    child?: string[];
    parent?: string[];
    createdAt: Date;
    updatedAt: Date;
}

export interface rootFolderType {
    name: string,
    _id: string
}
export interface pathTrackerType {
    names: string[];
    paths: string[];
}
export interface getFolderResponseType {
    success: boolean,
    msg: string,
    folders: rootFolderType[]
}