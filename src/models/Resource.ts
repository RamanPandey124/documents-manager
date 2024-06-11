import { IResource } from '@/lib/types/model';
import mongoose, { Schema, Model, model } from 'mongoose';

const resourceSchema: Schema<IResource> = new Schema(
    {
        name: { type: String, required: true },
        contentType: {
            type: String,
            enum: ['directory', 'file'],
            required: true,
        },
        child: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Resource' }],
        parent: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Resource' }],
    },
    {
        timestamps: true,
    }
);

const Resource: Model<IResource> = mongoose.models.Resource || model<IResource>('Resource', resourceSchema);

export default Resource;
