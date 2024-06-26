import { ITransferDetail } from "./context";
import { IResource } from "./model";

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
    contentType: 'directory' | "file";
    uniqueName?: string;
    filePath?: string
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

export interface IdbResource {
    name?: string;
    contentType: "directory" | "file";
    parent: string[];
    uniqueName?: string;
    filePath?: string
}

export interface IgetDrive {
    success: boolean,
    parent?: resourceDocument,
    children?: resourceDocument[]
}
export interface IgetFileData {
    success: boolean;
    msg: string;
    file?: resourceDocument;
    content?: string;
}

export interface IactionResonse {
    success: boolean,
    msg: string
}

export interface IsafePasteResponse {
    success: boolean,
    msg: string
    isDuplicateExist?: boolean;
    existingDetail?: IResource;
    providedDetail?: ItransferData
}

export interface ItransferData {
    childId: string | undefined;
    childName: string | undefined;
    oldParent: string | undefined;
    newParent: string | null;
    method: "copy" | "cut" | undefined;
}

export interface IdeleteDetail {
    file: resourceDocument,
    parentId: string
}

export interface IfileOptionsMenuProps {
    onClick: () => void;
    icon: JSX.Element;
    name: string;
}