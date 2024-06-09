import mongoose, { Schema, Document } from "mongoose";

export interface fileType extends Document {
    name: string;
    path: string;
    contentType: "directory" | "file";
    parent: string;
}

const fileSystemSchema = new Schema<fileType>({
    name: {
        type: String,
        required: [true, "Please provide a name for this document"],
    },
    path: {
        type: String,
        required: [true, "Please provide the path"],
    },
    contentType: {
        type: String,
        enum: ["directory", "file"],
        required: [true, "Please provide contentType"]
    },
    parent: {
        type: String,
        required: [true, "Please provide parent name"],
        default: "tree"
    }
});

export default mongoose.models.file_hierarchy || mongoose.model<fileType>("file_hierarchy", fileSystemSchema);