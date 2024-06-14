export interface ITransferDetail {
    oldParent?: string;
    newParent: string;
    fileID: string
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
    deleteDetail?: IDeletePayload
}

export interface ItransferPayload {
    file: resourceDocument,
    method: "cut" | "copy",
    oldParent: string
}

export interface IDeletePayload {
    id: string,
    parentId: string
}

export type Action =
    | { type: 'PATH', payload: resourceDocument }
    | { type: 'RENAME'; payload: resourceDocument }
    | { type: 'CANCEL_MODAL' }
    | { type: 'TRANSFER'; payload: ItransferPayload }
    | { type: 'END_TRANSFER'; }
    | { type: 'DELETE'; payload: IDeletePayload }

