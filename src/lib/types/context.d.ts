import { IResource } from "./model";
import { ItransferData, resourceDocument } from "./tree";

export interface ITransferDetail {
    oldParent?: string;
    fileID: string;
    fileName: string
}

export interface IDublicateDetails {
    msg: string;
    existingDetail: IResource;
    providedDetail: ItransferData
}
export interface State {
    path: Array<resourceDocument>;
    parent: {};
    currentParent: string | null;
    isRename: boolean;
    renameData?: resourceDocument;
    isTransfer: boolean;
    Transfermethod?: "cut" | "copy";
    transferDetail?: ITransferDetail;
    isDelete: boolean;
    deleteDetail?: IDeletePayload,
    isDublicateExist: boolean,
    DublicateDetails?: IDublicateDetails
}

export interface ItransferPayload {
    file: resourceDocument,
    method: "cut" | "copy",
    oldParent: string
}

export interface IDeletePayload {
    file: resourceDocument,
    parentId: string
}


export type Action =
    | { type: 'PATH', payload: resourceDocument }
    | { type: 'RENAME'; payload: resourceDocument }
    | { type: 'CANCEL_MODAL' }
    | { type: 'TRANSFER'; payload: ItransferPayload }
    | { type: 'END_TRANSFER'; }
    | { type: 'DELETE'; payload: IDeletePayload }
    | { type: 'DUBLICATE_PASTE'; payload: IDublicateDetails }

