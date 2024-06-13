import mongoose, { Document } from "mongoose";

export interface IResource extends Document {
    name: string;
    contentType: 'directory' | 'file';
    child?: mongoose.Types.ObjectId[];
    parent?: mongoose.Types.ObjectId[];
    uniqueName?: string;
    filePath?: string
}