import mongoose, { Schema, Document } from "mongoose";

export interface fileType extends Document {
    name: string;
    path: string;
    contentType: "directory" | "file";
}

const hierarchySchema = new Schema<fileType>(
    {
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
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.models.hierarchy || mongoose.model<fileType>("hierarchy", hierarchySchema);